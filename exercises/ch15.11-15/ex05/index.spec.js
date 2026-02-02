import { test, expect } from '@playwright/test';

test.describe('シンプルなToDoアプリ', () => {
  test.beforeEach(async ({ page }) => {
    // index.html をロード
    await page.goto('http://localhost:3000');
  });

  test('新しいToDoアイテムを追加できること', async ({ page }) => {
    const input = page.locator('#new-todo');
    const submitButton = page.locator('#new-todo-form button');

    // 新しいToDoを追加
    await input.fill('テスト用ToDo');
    await submitButton.click();

    // リストに追加されたか確認
    const todoItem = page.locator('#todo-list li');
    await expect(todoItem).toHaveCount(1);
    await expect(todoItem.locator('label')).toHaveText('テスト用ToDo');
  });

  test('ToDoアイテムを完了状態にできること', async ({ page }) => {
    const input = page.locator('#new-todo');
    const submitButton = page.locator('#new-todo-form button');

    // 新しいToDoを追加
    await input.fill('完了するToDo');
    await submitButton.click();

    // チェックボックスをクリックして完了にする
    const checkbox = page.locator('#todo-list li input[type="checkbox"]');
    await checkbox.check();

    // ラベルのスタイルが変更されたか確認
    const label = page.locator('#todo-list li label');
    await expect(label).toHaveCSS('text-decoration-line', 'line-through');
  });

  test('ToDoアイテムを削除できること', async ({ page }) => {
    const input = page.locator('#new-todo');
    const submitButton = page.locator('#new-todo-form button');

    // 新しいToDoを追加
    await input.fill('削除するToDo');
    await submitButton.click();

    // 削除ボタンをクリック
    const deleteButton = page.locator('#todo-list li button');
    await deleteButton.click();

    // リストが空になったか確認
    const todoItems = page.locator('#todo-list li');
    await expect(todoItems).toHaveCount(0);
  });
});
