import { C, ClosureC } from './index.ts';

test(`直接取得できる`, () => {
  const c = new C();
  // アクセスできないテスト書けないっぽい？
  // expect(c.x).toBeUndefined(); // 'x' is private and cannot be accessed directly
  expect(c.x).toBe(42);
});

test('ClosureC: getXで値が取得できる', () => {
  const c = new ClosureC();
  expect(c.getX()).toBe(42);
});

// 外部からxにアクセスできないことのテスト（型エラーになるためコメントで説明）
// expect(c.x).toBeUndefined(); // TypeScriptの型チェックでエラー
