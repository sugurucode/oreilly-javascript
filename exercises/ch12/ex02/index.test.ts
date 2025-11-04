import { fibonacciSequence, fibonacciIterator } from './index.ts';

describe('Fibonacci Functions Comparison', () => {
  let gen;
  let iter;

  beforeEach(() => {
    gen = fibonacciSequence();
    iter = fibonacciIterator();
  });

  /**
   * テスト1: next() による逐次比較
   * 両方のイテレータを同時に実行し、
   * 最初の20ステップの値が完全に一致することを確認します。
   */
  test('next() を20回呼び出して同一の数列が生成されること', () => {
    for (let i = 0; i < 20; i++) {
      const genResult = gen.next().value;
      const iterResult = iter.next().value;
      expect(iterResult).toBe(genResult);
    }
  });

  // 反復可能であることは、symbol.iterator メソッドが存在すること。
  test('fibonacciIterator が for-of で反復可能であること', () => {
    const iterForOf = fibonacciIterator(); // 新しいインスタンスを使用
    const results = [];
    const iterations = 10; // 最初の10個を取得

    for (const n of iterForOf) {
      if (results.length >= iterations) {
        break; // 無限ループを停止
      }
      results.push(n);
    }

    // 期待されるフィボナッチ数列（最初の10個）
    const expected = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

    expect(results).toEqual(expected);
  });
});
