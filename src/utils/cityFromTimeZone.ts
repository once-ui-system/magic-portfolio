/** "Asia/Jakarta" -> "Jakarta", "America/Argentina/Buenos_Aires" -> "Buenos Aires". */
export function cityFromTimeZone(timeZone: string): string {
  const city = timeZone.split("/").pop() ?? "";
  return city.replace(/_/g, " ");
}
