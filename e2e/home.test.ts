// e2e/tests/home.test.ts

import { test, expect } from "@playwright/test";

test("홈페이지가 올바르게 로드됩니다", async ({ page }) => {
  // 홈페이지 방문
  await page.goto("/");

  // 제목이 보이는지 확인
  const title = page.locator("h1");
  await expect(title).toBeVisible();
  await expect(title).toHaveText("게시글 목록");
});
