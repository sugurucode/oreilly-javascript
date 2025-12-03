import {
  nestedUnwritableObj,
  unwritableAndUnconfigurableObj,
  writableAndUnconfigurableObj,
} from './index.js';

test('Unwritable and unconfigurable object', () => {
  const a = unwritableAndUnconfigurableObj();
  expect(a).toStrictEqual({ a: 1 });
  expect(() => (a.a = 3)).toThrow(); // 書き換えるとエラーになること
  expect(() => delete a.a).toThrow(); // 削除するとエラーになること
});

test('Writable and unconfigurable object', () => {
  const b = writableAndUnconfigurableObj();
  expect(b).toStrictEqual({ b: 2 });
  b.b = 3;
  expect(b.b).toBe(3);
  expect(() => delete b.b).toThrow();
});

// ここ後で再帰にする。
test('Nested unwritable object', () => {
  const c = nestedUnwritableObj();
  expect(c).toStrictEqual({ c: { d: { e: 3 } } }); //
  expect(() => (c.f = 1)).toThrow();
  expect(() => (c.c.f = 1)).toThrow();
  expect(() => (c.c.d.f = 1)).toThrow();
  expect(() => (c.c.d.e.f = 1)).toThrow();
});
