import { beforeEach, describe, expect, it, vi } from "vitest";
import { submitContact } from "@/lib/actions/contact";
import { ApiError } from "@/lib/api/client";

const { sendContact } = vi.hoisted(() => ({ sendContact: vi.fn() }));
vi.mock("@/lib/api/contact", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/api/contact")>()),
  sendContact,
}));

const form = (fields: Record<string, string>) => {
  const data = new FormData();
  for (const [k, v] of Object.entries(fields)) data.set(k, v);
  return data;
};

const valid = {
  name: "太郎",
  email: "taro@example.com",
  subject: "件名",
  message: "本文",
};

beforeEach(() => {
  sendContact.mockClear();
  sendContact.mockImplementation(async () => undefined);
});

describe("submitContact", () => {
  it("正しい入力なら送信して sent", async () => {
    const state = await submitContact({ status: "idle" }, form(valid));
    expect(state.status).toBe("sent");
    expect(sendContact).toHaveBeenCalledWith(
      expect.objectContaining({ name: "太郎" }),
    );
  });

  it("不正な入力は項目ごとのエラーと入力値を返す", async () => {
    const state = await submitContact(
      { status: "idle" },
      form({ ...valid, email: "bad", message: "" }),
    );
    expect(state.status).toBe("error");
    expect(state.fieldErrors?.email).toBeTruthy();
    expect(state.fieldErrors?.message).toBeTruthy();
    expect(state.values?.name).toBe("太郎");
    expect(sendContact).not.toHaveBeenCalled();
  });

  it("honeypot が埋まっていたら送らずに sent を装う", async () => {
    const state = await submitContact(
      { status: "idle" },
      form({ ...valid, website: "http://spam" }),
    );
    expect(state.status).toBe("sent");
    expect(sendContact).not.toHaveBeenCalled();
  });

  it("レート制限は専用メッセージ", async () => {
    sendContact.mockImplementation(() => {
      throw new ApiError(429, "rate_limited", "x");
    });
    const state = await submitContact({ status: "idle" }, form(valid));
    expect(state.status).toBe("error");
    expect(state.message).toMatch(/送信回数/);
  });
});
