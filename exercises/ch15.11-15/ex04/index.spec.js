import { expect, test } from '@playwright/test';

// asyncにする理由は, page.gotoが非同期処理だから
test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/ch15.11-15/ex04/index.html');
});

test('初期状態ではToDoリストは空である', async ({ page }) => {
  // toHaveCountを使うと、0個であることを確認するまで待機・リトライしてくれます
  // getByrole：li(listitem),a href=""(link),button(button)などの役割で要素を特定できる
  await expect(page.getByRole('listitem')).toHaveCount(0);
});

test('新しいToDoを追加できる', async ({ page }) => {
  await page.getByRole('textbox').fill('新しいTODO!!');
  await page.getByRole('button', { name: 'Add' }).click();

  await expect(page.getByRole('listitem')).toHaveCount(1);

  // テキストの中身も確認
  const todo = page.getByRole('listitem').nth(0);
  // liの中には×ボタンやcheckboxもあるので、完全一致ではなく部分一致で確認
  await expect(todo).toHaveText(/新しいTODO!!/);
});

test('ToDoを削除できる', async ({ page }) => {
  // 準備: 2つ追加
  await page.getByRole('textbox').fill('消すタスク');
  await page.getByRole('button', { name: 'Add' }).click();

  await page.getByRole('textbox').fill('残すタスク');
  await page.getByRole('button', { name: 'Add' }).click();

  // 2個あることを確認
  await expect(page.getByRole('listitem')).toHaveCount(2);

  // 1つ目(index 0)のタスクの削除ボタン(❌)を押す
  await page.getByRole('listitem').nth(0).getByRole('button', { name: '❌' }).click();

  // 1個に減るまで待つ
  await expect(page.getByRole('listitem')).toHaveCount(1);

  // 残っているのが「残すタスク」であることを確認
  const todo = page.getByRole('listitem').nth(0);
  await expect(todo).toContainText('残すタスク');
});

test('ToDoを完了（チェック）にできる', async ({ page }) => {
  await page.getByRole('textbox').fill('完了させるタスク');
  await page.getByRole('button', { name: 'Add' }).click();

  // チェックボックスをクリック
  await page.getByRole('listitem').nth(0).getByRole('checkbox').check();

  // テキストに取り消し線がついているか確認
  const label = page.getByRole('listitem').nth(0).locator('label');
  // CSSのtext-decoration-lineプロパティがline-throughであることを期待する
  await expect(label).toHaveCSS('text-decoration-line', 'line-through');

  // チェックを外して元に戻るかも確認
  await page.getByRole('listitem').nth(0).getByRole('checkbox').uncheck();
  await expect(label).toHaveCSS('text-decoration-line', 'none');
});

test('リロードしてもデータが維持される', async ({ page }) => {
  await page.getByRole('textbox').fill('永続化テスト');
  await page.getByRole('button', { name: 'Add' }).click();

  // チェックも入れておく
  await page.getByRole('listitem').nth(0).getByRole('checkbox').check();

  // 確実に保存されるのを待つために少し待機を入れるか、状態を確認する
  await expect(page.getByRole('listitem')).toHaveCount(1);

  // ページをリロード
  await page.reload();

  // リロード後も1つ残っているか
  await expect(page.getByRole('listitem')).toHaveCount(1);

  // 中身の確認
  const item = page.getByRole('listitem').nth(0);
  await expect(item).toContainText('永続化テスト');
  await expect(item.getByRole('checkbox')).toBeChecked();
});

test('別タブと同期される', async ({ context, page }) => {
  // page は「タブA」

  // 「タブB」を新しく作る
  // contextとはブラウザのウィンドウに相当し、その中に複数のタブ(page)を作れる
  const page2 = await context.newPage();
  await page2.goto('http://localhost:3000/ch15.11-15/ex04/index.html');

  // タブAでタスクを追加
  await page.getByRole('textbox').fill('同期テスト');
  await page.getByRole('button', { name: 'Add' }).click();

  // タブBの方に自動的に表示されるまで待つ
  await expect(page2.getByRole('listitem')).toHaveCount(1);
  await expect(page2.getByText('同期テスト')).toBeVisible();
});
