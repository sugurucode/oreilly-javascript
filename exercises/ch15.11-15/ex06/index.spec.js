import { expect, test } from '@playwright/test';

// ... (addToDo, checkToDo, deleteToDo, countToDos, queryToDo 等の関数定義は変更なし) ...
async function addToDo(page, todo) {
  await page.getByRole('textbox').fill(todo);
  await page.getByRole('button', { name: 'Add' }).click();
}

async function countToDos(page) {
  return await page.getByRole('listitem').count();
}

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/ch15.11-15/ex06/index.html');
});

// ... (その他のテストはそのまま) ...

test('persist todos after reload', async ({ page }) => {
  await addToDo(page, '永続化テスト');
  expect(await countToDos(page)).toBe(1);
  await page.reload();
  expect(await countToDos(page)).toBe(1);
  await expect(page.getByText('永続化テスト')).toBeVisible();
});

// ★修正: BroadcastChannelにより同期が可能になったため、テストを有効化します
test('sync todos across tabs', async ({ context, page }) => {
  // page (タブA)

  // page2 (タブB) を作成
  const page2 = await context.newPage();
  await page2.goto('http://localhost:3000/ch15.11-15/ex06/index.html');

  // タブAでタスクを追加
  await addToDo(page, '同期テスト');

  // タブBに自動的に反映されているか確認
  // BroadcastChannel経由でデータが届き、DOMが更新されるのを待つ
  await expect(page2.getByText('同期テスト')).toBeVisible();
  expect(await countToDos(page2)).toBe(1);

  // 逆方向の同期（タブBで削除 -> タブAで消える）も確認するとより確実です
  const deleteBtn = page2.getByRole('listitem').first().getByRole('button', { name: 'Delete' });
  await deleteBtn.click();

  await expect(page.getByText('同期テスト')).not.toBeVisible();
});
