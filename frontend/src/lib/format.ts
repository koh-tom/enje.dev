/**
 * 日付は常に日本時間で扱う。
 * Rails は 0 時 JST（"2026-09-15T00:00:00+09:00"）で返すため、
 * 実行環境（Vercel は UTC）のタイムゾーンで読むと前日にずれる。
 */
const TIME_ZONE = "Asia/Tokyo";

const ymd = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function toYmd(iso: string | null | undefined) {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  const parts = Object.fromEntries(
    ymd.formatToParts(date).map((p) => [p.type, p.value]),
  );
  return { y: parts.year, m: parts.month, d: parts.day };
}

/** 日付を "2026.09.15" 形式にする。null は空文字 */
export function formatDate(iso: string | null | undefined): string {
  const date = toYmd(iso);
  return date ? `${date.y}.${date.m}.${date.d}` : "";
}

/** 日付を <time dateTime> 用の YYYY-MM-DD にする */
export function toDateTimeAttr(
  iso: string | null | undefined,
): string | undefined {
  const date = toYmd(iso);
  return date ? `${date.y}-${date.m}-${date.d}` : undefined;
}
