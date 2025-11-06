// export function retryWithExponentialBackoff(func, maxRetry, callback) {
//   let tryCount = 0;
//   function tryFunc() {
//     tryCount++;
//     // 成功したら
//     const result = func();
//     if (result) {
//       // funcの実行結果がtrue
//       callback(true);
//       // 成功したので
//       return;
//     }
//     // リトライ上限に達した場合
//     if (tryCount > maxRetry) {
//       // funcの実行結果がfalse
//       callback(false);
//       return;
//     }
//     // setTimeout(遅延後に実行、遅延時間)
//     // 指定した時間が経過した後に引数で渡した関数を非同期に実行
//     // 遅延時間は指数関数的に増加
//     setTimeout(tryFunc, 1000 * Math.pow(2, tryCount - 1));
//   }
//   // 最初の試行は遅延なしで実行
//   setTimeout(tryFunc, 0);
// }

import { log } from 'console';

// Promise版
export function retryWithExponentialBackoff(func, maxRetry) {
  // 1. 関数全体が Promise を返すように変更
  return new Promise((resolve, reject) => {
    let tryCount = 0;

    // 2. 内部の試行関数を async に変更 (await を使うため)
    async function tryFunc() {
      tryCount++;
      try {
        // 3. func() は Promise を返すので await で待つ
        const result = await func();
        // 4. 成功した場合 (funcがresolveした場合)
        // 元の callback(true) の代わり
        resolve(result);
        return;
      } catch (error) {
        // 5. 失敗した場合 (func が reject した場合)

        // 6. リトライ上限に達した場合
        //    (元の callback(false) の代わり)
        if (tryCount > maxRetry) {
          reject(error); // 最後の失敗エラーでリジェクト
          return;
        }

        // 7. リトライの遅延時間は元のロジックをそのまま
        setTimeout(tryFunc, 1000 * Math.pow(2, tryCount - 1));
      }
    }

    // 8. 最初の試行を開始
    setTimeout(tryFunc, 0);
  });
}

// --- 以下使用例 ---
// (動作確認用のダミー fetch 関数)
// let fetchCount = 0;
// function dummyFetch(url) {
//   console.log(`Attempt ${fetchCount + 1}: Fetching ${url}`);
//   return new Promise((resolve, reject) => {
//     fetchCount++;
//     // 3回目まで失敗させる
//     if (fetchCount <= 3) {
//       reject(new Error('Network Error (Simulated)'));
//     } else {
//       resolve({ ok: true, data: 'Success Data' });
//     }
//   });
// }

// // 実行例
// const resp = await retryWithExponentialBackoff(() => dummyFetch('https://example.com'), 5);
// log('Retry Success!', resp);
// suguru@A081003065:~/oreilly_javascript7_fix/exercises-public$ npm run tsrun exercises/ch13/ex11/index.js

// > preset-ts@1.0.0 tsrun
// > tsx exercises/ch13/ex11/index.js

// Retry test starting...
// Attempt 1: Fetching https://example.com
// Attempt 2: Fetching https://example.com
// Attempt 3: Fetching https://example.com
// Attempt 4: Fetching https://example.com
// Retry Success! { ok: true, data: 'Success Data' }
