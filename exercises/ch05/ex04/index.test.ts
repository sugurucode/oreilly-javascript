import { fibonacciWhile, fibonacciDoWhile, fibonacciFor } from './index.ts';

describe('fibonacciWhile', () => {
  it('最初の10個のフィボナッチ数列を返す', () => {
    expect(fibonacciWhile()).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
});

describe('fibonacciDoWhile', () => {
  it('最初の10個のフィボナッチ数列を返す', () => {
    expect(fibonacciDoWhile()).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
});

describe('fibonacciFor', () => {
  it('最初の10個のフィボナッチ数列を返す', () => {
    expect(fibonacciFor()).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
});
