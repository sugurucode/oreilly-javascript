import { test, expect } from '@playwright/test';

test.describe('Product List Filter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/exercises/ch15.01-03/ex14/index.html');
  });

  test('初期状態では全ての商品が表示される', async ({ page }) => {
    const food1 = page.getByTestId('food1');
    const stationery1 = page.getByTestId('stationery1');
    const stationery2 = page.getByTestId('stationery2');

    await expect(food1).toBeVisible();
    await expect(stationery1).toBeVisible();
    await expect(stationery2).toBeVisible();
  });

  test('「すべて」を選択すると全ての商品が表示される', async ({ page }) => {
    const select = page.getByTestId('select');
    const food1 = page.getByTestId('food1');
    const stationery1 = page.getByTestId('stationery1');
    const stationery2 = page.getByTestId('stationery2');

    // 一度別のカテゴリに切り替えてから「すべて」に戻す
    await select.selectOption('food');
    await select.selectOption('all');

    await expect(food1).toBeVisible();
    await expect(stationery1).toBeVisible();
    await expect(stationery2).toBeVisible();
  });

  test('「食品」を選択すると食品カテゴリのみ表示される', async ({ page }) => {
    const select = page.getByTestId('select');
    const food1 = page.getByTestId('food1');
    const stationery1 = page.getByTestId('stationery1');
    const stationery2 = page.getByTestId('stationery2');

    await select.selectOption('food');

    await expect(food1).toBeVisible();
    await expect(stationery1).not.toBeVisible();
    await expect(stationery2).not.toBeVisible();
  });

  test('「文房具」を選択すると文房具カテゴリのみ表示される', async ({ page }) => {
    const select = page.getByTestId('select');
    const food1 = page.getByTestId('food1');
    const stationery1 = page.getByTestId('stationery1');
    const stationery2 = page.getByTestId('stationery2');

    await select.selectOption('stationery');

    await expect(food1).not.toBeVisible();
    await expect(stationery1).toBeVisible();
    await expect(stationery2).toBeVisible();
  });

  test('カテゴリを切り替えると表示が正しく更新される', async ({ page }) => {
    const select = page.getByTestId('select');
    const food1 = page.getByTestId('food1');
    const stationery1 = page.getByTestId('stationery1');
    const stationery2 = page.getByTestId('stationery2');

    // 食品を選択
    await select.selectOption('food');
    await expect(food1).toBeVisible();
    await expect(stationery1).not.toBeVisible();
    await expect(stationery2).not.toBeVisible();

    // 文房具に切り替え
    await select.selectOption('stationery');
    await expect(food1).not.toBeVisible();
    await expect(stationery1).toBeVisible();
    await expect(stationery2).toBeVisible();

    // すべてに戻す
    await select.selectOption('all');
    await expect(food1).toBeVisible();
    await expect(stationery1).toBeVisible();
    await expect(stationery2).toBeVisible();
  });
});
