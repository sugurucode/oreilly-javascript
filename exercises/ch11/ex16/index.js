export function retryWithExponentialBackoff(func, maxRetry, callback) {
  let tryCount = 0;
  function tryFunc() {
    tryCount++;
    const result = func();
    if (result) {
      // funcの実行結果がtrue
      callback(true);
      return;
    }
    // リトライ上限に達した場合
    if (tryCount > maxRetry) {
      // funcの実行結果がfalse
      callback(false);
      return;
    }
    // setTimeout(遅延後に実行、遅延時間)
    // 指定した時間が経過した後に引数で渡した関数を非同期に実行
    // 遅延時間は指数関数的に増加
    setTimeout(tryFunc, 1000 * Math.pow(2, tryCount - 1));
  }
  // 最初の試行は遅延なしで実行
  setTimeout(tryFunc, 0);
}
