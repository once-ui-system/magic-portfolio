export function formatDate(date: string, includeRelative = false) {
  // Parse input date as UTC to ensure deterministic server/client rendering
  let targetDate: Date;
  if (!date.includes("T")) {
    // Expected format YYYY-MM-DD → interpret as midnight UTC
    const [y, m, d] = date.split("-").map((v) => parseInt(v, 10));
    targetDate = new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
  } else {
    // If time provided, prefer treating as UTC when no zone present
    targetDate = /Z|[+-]\d{2}:?\d{2}$/.test(date) ? new Date(date) : new Date(`${date}Z`);
  }

  // Build a stable, locale-specific string but pinned to UTC timezone
  const fullDate = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(targetDate);

  if (!includeRelative) {
    return fullDate;
  }

  // Relative part computed in UTC to avoid hydration drift
  const now = new Date();
  const nowUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const targetUTC = new Date(Date.UTC(targetDate.getUTCFullYear(), targetDate.getUTCMonth(), targetDate.getUTCDate()));

  const msPerDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.floor((nowUTC.getTime() - targetUTC.getTime()) / msPerDay);

  let formattedRelative: string;
  if (diffDays <= 0) {
    formattedRelative = "Today";
  } else if (diffDays < 31) {
    formattedRelative = `${diffDays}d ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    formattedRelative = `${months}mo ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    formattedRelative = `${years}y ago`;
  }

  return `${fullDate} (${formattedRelative})`;
}
