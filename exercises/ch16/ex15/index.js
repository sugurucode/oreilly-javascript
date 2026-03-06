import threads from 'worker_threads';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (threads.isMainThread) {
  // 1. sharedArray を number 型の変数 num にする
  let num = 0;
  let workersFinished = false;

  // ワーカースレッドを作成
  const worker = new threads.Worker(__filename);

  // 3. メインスレッドでメッセージを受信したら num をインクリメントする
  worker.on('message', (msg) => {
    if (msg === 'numをインクリメントせよ') {
      num++;
    } else if (msg === 'done') {
      workersFinished = true;
      // 両方のインクリメントが終了したかチェックして表示
      // (メインのループも終わっていることが前提)
      checkFinished();
    }
  });

  // 2. メインスレッドの for ループで num をインクリメントする
  let mainFinished = false;
  for (let i = 0; i < 10_000_000; i++) {
    num++;
  }
  mainFinished = true;

  function checkFinished() {
    if (mainFinished && workersFinished) {
      // メッセージパッシングの場合、正しく 20,000,000 と表示される
      console.log(num);
    }
  }
} else {
  // 3. サブスレッドから "num をインクリメントせよ" というメッセージを送る
  for (let i = 0; i < 10_000_000; i++) {
    // threads.parentPortは、ワーカースレッドからメインスレッドにメッセージを送るためのオブジェクト。
    // postMessage() メソッドを使ってメッセージを送ることができる。
    threads.parentPort.postMessage('numをインクリメントせよ');
  }

  // インクリメント依頼が終わったら通知
  threads.parentPort.postMessage('done');
}
