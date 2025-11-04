/**
 * 指定された時間(ms)待機する Promise を返すヘルパー関数
 * @param {number} ms 待機するミリ秒
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Promiseを返す関数を、指数関数的バックオフ（1秒, 2秒, 4秒...）でリトライする
 *
 * @param {() => Promise<T>} func 実行する非同期関数 (Promiseを返す関数)
 * @param {number} maxRetry 最大リトライ回数
 * @returns {Promise<T>} funcが成功した場合、その結果で解決されるPromise
 * @template T
 */
export async function retryWithExponentialBackoff(func, maxRetry) {
  let tryCount = 0;

  // リトライ回数が上限に達するまで (あるいは成功するまで) ループ
  while (true) {
    tryCount++;

    try {
      // 1. 関数を実行
      const result = await func();

      // 2. 成功した場合: 結果を返し (Promiseが解決) 終了
      return result;
    } catch (error) {
      // 3. 失敗した場合

      // 4. リトライ上限チェック
      if (tryCount > maxRetry) {
        // 5. 上限を超えた場合: エラーをスロー (Promiseが拒否) して終了
        console.error(`Retry limit (${maxRetry}) exceeded. Last error:`, error);
        throw error; // 最後に発生したエラーをスローする
      }

      // 6. 遅延時間を計算 (1回目: 1s, 2回目: 2s, 3回目: 4s...)
      // (tryCount が 1 から始まるため、tryCount - 1 で 2^0=1 から)
      const delayTime = 1000 * Math.pow(2, tryCount - 1);

      console.warn(
        `Attempt ${tryCount} failed. Retrying in ${delayTime}ms... (Error: ${error.message})`,
      );

      // 7. 計算した時間だけ待機
      await delay(delayTime);

      // 8. ループの先頭に戻り再試行
    }
  }
}
