# Preview flow

Work reaches `main` through `preview`. Lorant sees milestones as short demos
and approves them; nothing technical waits on them.

1. **Branch from `preview` and open PRs against `preview`.** Squash-merge your
   own PR once CI is green. Label it `no-demo` when nothing visible changes
   (CI, tests, tooling, refactors with no behaviour change, dependency bumps,
   typo fixes). Leave it unlabeled when it needs a demo.
2. **`preview` deploys to a stable URL** (Vercel builds only `main` and
   `preview`). Everything on it must be safe to ship: unfinished work stays
   unlinked or behind a flag.
3. **Demo per milestone, not per PR**: one message with screenshots of the
   preview site (desktop and phone), a short video for interactions, or a few
   lines of output for non-visual work. Ask for in-app testing only when a
   screenshot or video can't prove it (payments, sign-in, production data,
   on-device feel, breaking changes, a big launch).
4. **Approved** → label the milestone's PRs `approved`. **Change it** → fix on
   `preview` and demo again. **Dropped** → revert on `preview` (`no-demo`) and
   label the original `dropped`.
5. **Shipping**: the "Ship preview to main" PR lists what `preview` has that
   `main` doesn't. When its **Ship gate** status and CI are green, merge it
   with a **merge commit** (never squash). Open it if preview is ahead and
   none is open.
6. **Production hotfix only**: PR to `main`, merge on green. `preview` catches
   up on its own (.github/workflows/preview.yml).

npm `latest` publishes and production database migrations keep their own
approval gates.
