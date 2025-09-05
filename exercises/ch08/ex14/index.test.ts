import { any, catching } from './index.ts';

describe('any関数のテスト', () => {
  const isNonZero = any(
    (n) => n > 0,
    (n) => n < 0,
  );

  test('0を渡すとfalse', () => {
    expect(isNonZero(0)).toBe(false);
  });

  test('正の数を渡すとtrue', () => {
    expect(isNonZero(42)).toBe(true);
  });

  test('負の数を渡すとtrue', () => {
    expect(isNonZero(-0.5)).toBe(true);
  });
});

describe('catching', () => {
  const safeJsonParse = catching(JSON.parse, (e) => ({ error: e.toString() }));
  test('正しいJSON文字列ならパースできる', () => {
    expect(safeJsonParse('{"a":1}')).toEqual({ a: 1 });
  });
  test('不正なJSON文字列ならエラーオブジェクトが返る', () => {
    const result = safeJsonParse('{Invalid Json}');
    expect(result.error).toMatch(/SyntaxError/);
  });
});
