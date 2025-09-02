import { powerOptimizedRecursive } from './index.ts';

describe('powerOptimizedRecursive', () => {
  test('0の0乗は1', () => {
    expect(powerOptimizedRecursive(0, 0)).toBe(1);
  });

  test('指数0の場合は1', () => {
    expect(powerOptimizedRecursive(2, 0)).toBe(1);
  });

  test('正の指数', () => {
    expect(powerOptimizedRecursive(2, 3)).toBe(8);
  });

  test('負の指数', () => {
    expect(powerOptimizedRecursive(2, -3)).toBeCloseTo(1 / 8);
  });

  test('奇数・偶数指数', () => {
    expect(powerOptimizedRecursive(2, 5)).toBe(32); // 奇数
    expect(powerOptimizedRecursive(2, 6)).toBe(64); // 偶数
  });

  test('負の数の指数', () => {
    expect(powerOptimizedRecursive(-2, 3)).toBe(-8);
    expect(powerOptimizedRecursive(-2, -3)).toBeCloseTo(-1 / 8);
  });

  test('底が1の場合', () => {
    expect(powerOptimizedRecursive(1, 1000)).toBe(1);
  });
});
