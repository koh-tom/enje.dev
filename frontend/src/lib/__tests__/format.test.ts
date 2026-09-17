import { describe, expect, it } from "vitest";
import { formatDate, toDateTimeAttr } from "@/lib/format";

describe("formatDate", () => {
  it("0 時 JST の日付を日本時間のまま表示する", () => {
    expect(formatDate("2025-10-06T00:00:00+09:00")).toBe("2025.10.06");
  });

  it("UTC 表記でも日本時間の日付にする", () => {
    expect(formatDate("2025-10-05T15:00:00Z")).toBe("2025.10.06");
  });

  it("null や不正な値は空文字", () => {
    expect(formatDate(null)).toBe("");
    expect(formatDate("not a date")).toBe("");
  });
});

describe("toDateTimeAttr", () => {
  it("0 時 JST の日付を前日にしない", () => {
    expect(toDateTimeAttr("2025-10-06T00:00:00+09:00")).toBe("2025-10-06");
  });

  it("null は undefined", () => {
    expect(toDateTimeAttr(null)).toBeUndefined();
  });
});
