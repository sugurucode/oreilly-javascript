// index.js

document.getElementById('image').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();
  // readerのloadイベントは、ファイルの読み込みが完了したときに発火する
  reader.addEventListener('load', (e) => {
    img.src = e.target.result;
  });
  // imgのloadイベントは、画像が完全に読み込まれたときに発火する
  img.addEventListener('load', () => {
    // Canvasを操作するための準備
    const originalCanvas = document.getElementById('original');
    const filteredCanvas = document.getElementById('filtered');
    const originalCtx = originalCanvas.getContext('2d');
    const filteredCtx = filteredCanvas.getContext('2d');

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);
    // 画像のピクセルデータを取得
    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);

    //-------------------ここまでは元のコードと同じ----------------------------------------

    // worker.js を使って、重い計算を別スレッドで行うためのコード
    const worker = new Worker('worker.js');

    // Worker から計算結果が返ってきた時の処理
    worker.onmessage = (e) => {
      // 返ってきた生データ（Uint8ClampedArray）を、Canvas用の画像データに変換
      const outputData = e.data;
      const outputImageData = new ImageData(outputData, img.width, img.height);

      // フィルタ適用画像用の Canvas に描画
      filteredCtx.putImageData(outputImageData, 0, 0);
      // ない場合でもブラウザを閉じるとWorkerは自動的に終了するが、明示的に終了させるのがベストプラクティス
      worker.terminate();
    };

    // workerに画像データを送る
    worker.postMessage({
      data: imageData.data,
      width: img.width,
      height: img.height,
    });
  });
  reader.readAsDataURL(file);
});
