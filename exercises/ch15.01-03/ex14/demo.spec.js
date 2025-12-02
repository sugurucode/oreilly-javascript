import { test } from '@playwright/test';

test('Product List フィルタリングのデモ', async ({ page }) => {
  // ページを開く
  await page.goto('/exercises/ch15.01-03/ex14/index.html');

  // 初期状態を表示（3秒待機）
  console.log('初期状態: すべての商品が表示されています');
  await page.waitForTimeout(3000);

  // 「食品」を選択
  console.log('「食品」を選択');
  await page.getByTestId('select').selectOption('food');
  await page.waitForTimeout(3000);

  // 「文房具」を選択
  console.log('「文房具」を選択');
  await page.getByTestId('select').selectOption('stationery');
  await page.waitForTimeout(3000);

  // 「すべて」に戻す
  console.log('「すべて」に戻す');
  await page.getByTestId('select').selectOption('all');
  await page.waitForTimeout(3000);

  console.log('デモ完了');
});
