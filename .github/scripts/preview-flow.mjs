// Keeps `preview` and `main` in step, and says when preview may ship.
//
//   sync  main moved (a ship or a hotfix): bring preview up to main.
//         Fast-forward when preview has nothing of its own, otherwise merge
//         main in. On a conflict, leave preview alone and open a sync PR.
//   gate  list the PRs merged into preview that main doesn't have yet. Each
//         needs the label `approved` (demo approved), `no-demo` (nothing to
//         show) or `dropped` (reverted on preview). When all have one, the
//         "Ship gate" status on preview's head turns green and the Ship PR
//         (preview -> main) may be merged with a merge commit.
//
// DRY_RUN=1 prints writes and pushes instead of making them.
// Same file in core, stack, studio, motion and magic-portfolio. Run by .github/workflows/preview.yml.

import { execFileSync } from "node:child_process";
import { appendFileSync } from "node:fs";

const REPO = process.env.GITHUB_REPOSITORY;
const TOKEN = process.env.GITHUB_TOKEN;
const PREVIEW = "preview";
const MAIN = "main";
const DONE_LABELS = ["approved", "no-demo", "dropped"];
const SHIP_TITLE = "Ship preview to main";
const MARKER = "<!-- preview-flow:ship -->";

const git = (...args) => {
  if (DRY && args[0] === "push") return console.log(`[dry] git ${args.join(" ")}`);
  return execFileSync("git", args, { encoding: "utf8" }).trim();
};
const tryGit = (...args) => {
  try {
    git(...args);
    return true;
  } catch {
    return false;
  }
};

const DRY = Boolean(process.env.DRY_RUN);

async function api(method, path, body) {
  if (DRY && method !== "GET") return console.log(`[dry] ${method} ${path} ${JSON.stringify(body ?? {})}`);
  const res = await fetch(`https://api.github.com/repos/${REPO}${path}`, {
    method,
    headers: {
      authorization: `Bearer ${TOKEN}`,
      accept: "application/vnd.github+json",
      "x-github-api-version": "2022-11-28",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`${method} ${path}: ${res.status} ${await res.text()}`);
  return res.status === 204 ? null : res.json();
}

const summary = (line) => {
  console.log(line);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${line}\n`);
};

async function ensureLabels() {
  const colors = { approved: "2da44e", "no-demo": "8c959f", dropped: "cf222e" };
  for (const name of DONE_LABELS) {
    await api("POST", "/labels", { name, color: colors[name] }).catch(() => {});
  }
}

// preview may not exist yet, so it's fetched on its own.
const fetchBoth = () => {
  git("fetch", "--quiet", "origin", `+refs/heads/${MAIN}:refs/remotes/origin/${MAIN}`);
  tryGit("fetch", "--quiet", "origin", `+refs/heads/${PREVIEW}:refs/remotes/origin/${PREVIEW}`);
};

async function sync() {
  fetchBoth();
  if (!tryGit("rev-parse", "--verify", "--quiet", `origin/${PREVIEW}`)) {
    git("push", "origin", `origin/${MAIN}:refs/heads/${PREVIEW}`);
    return summary("Created preview from main.");
  }
  if (tryGit("merge-base", "--is-ancestor", `origin/${PREVIEW}`, `origin/${MAIN}`)) {
    git("push", "origin", `origin/${MAIN}:refs/heads/${PREVIEW}`);
    return summary("Fast-forwarded preview to main.");
  }
  if (tryGit("merge-base", "--is-ancestor", `origin/${MAIN}`, `origin/${PREVIEW}`)) {
    return summary("Preview already has main.");
  }
  git("checkout", "--quiet", "-B", PREVIEW, `origin/${PREVIEW}`);
  if (tryGit("merge", "--no-edit", "-m", "Sync main into preview", `origin/${MAIN}`)) {
    git("push", "origin", `HEAD:refs/heads/${PREVIEW}`);
    return summary("Merged main into preview.");
  }
  git("merge", "--abort");
  const open = await api("GET", `/pulls?state=open&base=${PREVIEW}&head=${REPO.split("/")[0]}:${MAIN}`);
  if (!open.length) {
    await api("POST", "/pulls", {
      title: "Sync main into preview",
      head: MAIN,
      base: PREVIEW,
      body: "main and preview conflict. Merge main into preview by hand, resolve, and merge this PR.",
    }).catch((e) => summary(`Could not open the sync PR: ${e.message}`));
  }
  summary("main and preview conflict: needs a sync PR (main -> preview).");
}

async function gate() {
  fetchBoth();
  if (!tryGit("rev-parse", "--verify", "--quiet", `origin/${PREVIEW}`)) return summary("No preview branch yet.");
  const head = git("rev-parse", `origin/${PREVIEW}`);
  const ahead = Number(git("rev-list", "--count", `origin/${MAIN}..origin/${PREVIEW}`));

  // Merged PRs into preview, newest first, until three pages in a row are all on main.
  const items = [];
  for (let page = 1, quiet = 0; page <= 10 && quiet < 3; page++) {
    const prs = await api(
      "GET",
      `/pulls?state=closed&base=${PREVIEW}&sort=updated&direction=desc&per_page=50&page=${page}`,
    );
    if (!prs.length) break;
    let found = 0;
    for (const pr of prs) {
      if (!pr.merged_at) continue;
      if (tryGit("merge-base", "--is-ancestor", pr.merge_commit_sha, `origin/${MAIN}`)) continue;
      found++;
      const labels = pr.labels.map((l) => l.name);
      items.push({ number: pr.number, title: pr.title, done: DONE_LABELS.find((l) => labels.includes(l)) });
    }
    quiet = found ? 0 : quiet + 1;
  }
  items.sort((a, b) => a.number - b.number);
  const waiting = items.filter((i) => !i.done);

  const ready = ahead > 0 && waiting.length === 0;
  const description =
    ahead === 0
      ? "Nothing to ship"
      : ready
        ? "Ready to ship"
        : `Waiting on ${waiting.length} demo${waiting.length > 1 ? "s" : ""}: ${waiting.map((i) => `#${i.number}`).join(" ")}`;
  await api("POST", `/statuses/${head}`, {
    context: "Ship gate",
    state: ahead === 0 || ready ? "success" : "pending",
    description: description.slice(0, 140),
  });

  const lines = items.map((i) => `- [${i.done ? "x" : " "}] #${i.number} ${i.title}${i.done ? ` (${i.done})` : ""}`);
  const body = [
    MARKER,
    "Everything on `preview` that `main` doesn't have yet. Each PR ships once its demo is approved",
    "(label `approved`), or it has nothing to demo (`no-demo`) or was reverted (`dropped`).",
    "When the **Ship gate** status is green, merge this PR with a **merge commit** (never squash).",
    "",
    lines.length ? lines.join("\n") : "_Only sync commits so far._",
  ].join("\n");

  const [ship] = await api("GET", `/pulls?state=open&base=${MAIN}&head=${REPO.split("/")[0]}:${PREVIEW}`);
  if (ship) {
    await api("PATCH", `/pulls/${ship.number}`, { body });
  } else if (ahead > 0) {
    // Fails when Actions may not open PRs in this repo; a Claude session opens it then.
    await api("POST", "/pulls", { title: SHIP_TITLE, head: PREVIEW, base: MAIN, body }).catch((e) =>
      summary(`Could not open the Ship PR (open it by hand): ${e.message.split("\n")[0]}`),
    );
  }

  summary(`Ship gate: ${description}`);
  for (const line of lines) summary(line);
}

await ensureLabels();
const mode = process.argv[2];
if (mode === "sync" || mode === "all") await sync();
if (mode === "gate" || mode === "sync" || mode === "all") await gate();
