import threads from 'worker_threads';

if (threads.isMainThread) {
  // メインスレッドでは、1 つの要素を持つ型付き配列を作成し共有する。
  // 両方のスレッドから同時にsharedArray[0] を読み書きできるようになる。
  let sharedBuffer = new SharedArrayBuffer(4);
  let sharedArray = new Int32Array(sharedBuffer);
  // ここでワーカースレッドを作成し、共有配列をworkerData の初期値
  // として渡して、面倒なメッセージの送受信を行わないようにする。
  let worker = new threads.Worker(__filename, { workerData: sharedArray });
  // ワーカーが動き出すのを待ち、その後共有する整数を1000 万回
  // インクリメントする。
  worker.on('online', () => {
    for (let i = 0; i < 10_000_000; i++) sharedArray[0]++;
    // インクリメントが終了したら、message イベントを待ち受けし、
    // ワーカーの終了通知を受け取る。
    worker.on('message', () => {
      // 共有された整数は2000 万回インクリメントされているが、実際の
      // 値は一般的にはもっと小さなものになる。筆者のコンピュータでは、
      // 最終的な値は1200 万よりも小さな値になっていた。
      console.log(sharedArray[0]);
    });
  });
} else {
  // ワーカースレッドでは、workerData から共有配列を取得し、
  // 1000 万回インクリメントする。
  let sharedArray = threads.workerData;
  for (let i = 0; i < 10_000_000; i++) sharedArray[0]++;
  // インクリメントが終わったら、メインスレッドに通知する。
  threads.parentPort.postMessage('done');
}
