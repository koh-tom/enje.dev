import { afterEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { ApiError, apiGet, apiPost } from "@/lib/api/client";

const fetchMock = vi.fn();
vi.stubGlobal("fetch", fetchMock);

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

afterEach(() => fetchMock.mockReset());

describe("apiGet", () => {
  it("URL とキャッシュタグを付けて取得し、スキーマで検証する", async () => {
    fetchMock.mockResolvedValue(jsonResponse({ data: [1, 2] }));
    const result = await apiGet(
      "/posts",
      z.object({ data: z.array(z.number()) }),
      {
        tags: ["posts"],
        searchParams: { tag: "ruby", page: undefined, per: 5 },
      },
    );
    expect(result.data).toEqual([1, 2]);
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toBe(
      "http://localhost:3000/api/v1/posts?tag=ruby&per=5",
    );
    expect(init.next).toEqual({ tags: ["posts"], revalidate: 3600 });
  });

  it("404 は ApiError（isNotFound）になる", async () => {
    fetchMock.mockResolvedValue(
      jsonResponse({ error: { code: "not_found", message: "x" } }, 404),
    );
    const promise = apiGet("/posts/nope", z.any(), { tags: ["posts"] });
    await expect(promise).rejects.toBeInstanceOf(ApiError);
    await expect(promise).rejects.toMatchObject({
      status: 404,
      code: "not_found",
      isNotFound: true,
    });
  });

  it("スキーマに合わないレスポンスは例外", async () => {
    fetchMock.mockResolvedValue(jsonResponse({ data: "wrong" }));
    await expect(
      apiGet("/posts", z.object({ data: z.array(z.number()) }), {
        tags: ["posts"],
      }),
    ).rejects.toThrow();
  });
});

describe("apiPost", () => {
  it("JSON を送り、空レスポンスは null として扱う", async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 202 }));
    await expect(apiPost("/contacts", { a: 1 }, z.null())).resolves.toBeNull();
    const [, init] = fetchMock.mock.calls[0];
    expect(init.method).toBe("POST");
    expect(init.body).toBe(JSON.stringify({ a: 1 }));
    expect(init.cache).toBe("no-store");
  });

  it("422 は details 付きの ApiError", async () => {
    fetchMock.mockResolvedValue(
      jsonResponse(
        {
          error: { code: "invalid", message: "x", details: { email: ["bad"] } },
        },
        422,
      ),
    );
    await expect(apiPost("/contacts", {}, z.null())).rejects.toMatchObject({
      details: { email: ["bad"] },
    });
  });
});
