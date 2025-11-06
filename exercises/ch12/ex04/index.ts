/**
 * P363 の filter 関数（ヒント）
 * iterable をフィルタし、predicate が true の要素のみを反復する
 */
// const plus2 = n => n + 2;
// console.log(plus2(3)); // 5

// 使用例: filter([1, 2, 3, 4, 5], n => n % 2 === 0) は 2, 4 を生成
function filter(iterable, predicate) {
  let iterator = iterable[Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      for (;;) {
        let v = iterator.next();
        // 終了状態 (done: true) または predicate が true の場合に返す
        //predicateは関数
        if (v.done || predicate(v.value)) {
          return v;
        }
        // predicate が false だったら、次の要素に進む (for(;;) ループ)
      }
    },
  };
}

/**
 * n から始まる無限の整数列を生成するジェネレータ
 * (例: 2, 3, 4, 5, ...)
 */
function* integersFrom(n) {
  while (true) {
    yield n++;
  }
}
export function* primes() {
  // 2から始まる無限の整数列を取得
  let numbers = integersFrom(2);

  // 無限ループで素数をふるい落とし続ける
  while (true) {
    let p = numbers.next().value;
    yield p; //{value: p, done: false};

    // ある数字nが、それより小さい素数で割り切れない場合、nは素数である。
    // したがって素数pで割り切れる数を取り除く。(再起)
    numbers = filter(numbers, (n) => n % p !== 0);
  }
}
