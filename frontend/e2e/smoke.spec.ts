import { expect, test } from "@playwright/test";

test("トップページが表示される", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/enje\.dev/);
  await expect(page.getByRole("main")).toBeVisible();
});

test("記事一覧から記事詳細へ遷移できる", async ({ page }) => {
  await page.goto("/blog");
  await page
    .getByRole("link", { name: /FPGA で L チカするまで/ })
    .first()
    .click();
  await expect(page).toHaveURL(/\/blog\/hello-fpga$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "FPGA で L チカするまで",
  );
});

test("存在しない記事は 404", async ({ page }) => {
  const response = await page.goto("/blog/no-such-post");
  expect(response?.status()).toBe(404);
});

test("プロジェクト一覧が表示される", async ({ page }) => {
  await page.goto("/portfolio");
  await expect(
    page.getByRole("link", { name: /enje\.dev/ }).first(),
  ).toBeVisible();
});

test("再検証ルートは秘密が違えば 401", async ({ request }) => {
  const response = await request.post("/api/revalidate", {
    headers: { "x-revalidate-secret": "wrong" },
    data: { tags: ["posts"] },
  });
  expect(response.status()).toBe(401);
});
