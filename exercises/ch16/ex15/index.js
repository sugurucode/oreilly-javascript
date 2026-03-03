import threads from 'worker_threads';
import { fileURLToPath } from 'url';

// Jestなどの環境で __filename を正しく扱うための処理
const __filename = fileURLToPath(import.meta.url);

if (threads.isMainThread) {
  // 1. sharedArray を number 型の変数 num にする
  let num = 0;
  let workerFinished = false;

  const worker = new threads.Worker(__filename);

  worker.on('online', () => {
    // 2. メインスレッドの for ループで num をインクリメントする
    for (let i = 0; i < 10_000_000; i++) num++;

    // 自分の処理が終わった際、既にワーカーが終わっていれば結果を表示
    if (workerFinished) console.log(num);
  });

  // 3. サブスレッドからのメッセージを受信してインクリメント
  worker.on('message', (message) => {
    if (message === 'increment') {
      num++;
    } else if (message === 'done') {
      workerFinished = true;
      // メイン側のループも終わっていれば結果を表示
      // (通常、メッセージ送信のオーバーヘッドでメインが先に終わります)
      console.log(`最終結果: ${num}`);
    }
  });
} else {
  // 3. サブスレッドの for ループでメッセージを送る
  for (let i = 0; i < 10_000_000; i++) {
    threads.parentPort.postMessage('increment');
  }
  // インクリメントが終わったら、メインスレッドに通知する
  threads.parentPort.postMessage('done');
}
