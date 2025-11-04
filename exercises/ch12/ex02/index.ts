export function* fibonacciSequence() {
  let x = 0,
    y = 1;
  for (;;) {
    yield y;
    [x, y] = [y, x + y]; // 分割代入を行っている。
  }
}

// const fib = fibonacciSequence();
// for (let i = 0; i < 10; i++) {
//   console.log(fib.next().value);
// }

export function fibonacciIterator() {
  // 状態変数 (x, y) をクロージャで保持
  let x = 0,
    y = 1;

  // イテレータオブジェクトを返す
  return {
    /**
     * [Symbol.iterator]メソッド
     * イテラブル（反復可能）にするために必要。
     */
    [Symbol.iterator]() {
      return this;
    },

    /**
     * next() メソッド
     * イテレータの本体。
     * 呼び出されるたびに次の値を生成する。
     */
    next() {
      // 1. 現在の y の値を返す値 (value) として保持
      const value = y;

      // 2. 次の状態を計算
      [x, y] = [y, x + y];

      // 3. { value, done } オブジェクトを返す
      return { value: value, done: false };
    },
  };
}
