import { fib2 } from './fib';

describe('フィボナッチ関数', () => {
  it('fib2(0) = 0, fib2(1) = 1', () => {
    expect(fib2(0)).toBe(0);
    expect(fib2(1)).toBe(1);
  });

  it('fib(5)` は `5` を返す', () => {
    expect(fib2(5)).toBe(5);
  });

  it('fib2(75) は正しい値を返す', () => {
    expect(fib2(75)).toBe(2111485077978050);
  });
});
