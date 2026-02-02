// /home/suguru/oreilly_javascript7_fix/exercises-public/exercises/ch15.11-15/ex10/index.js

document.getElementById('image').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener('load', (e) => {
    img.src = e.target.result;
  });

  img.addEventListener('load', () => {
    const originalCanvas = document.getElementById('original');
    const filteredCanvas = document.getElementById('filtered');
    const originalCtx = originalCanvas.getContext('2d');
    const filteredCtx = filteredCanvas.getContext('2d');

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);

    // --- Web Worker 処理の開始 ---

    // Worker のインスタンス化
    const worker = new Worker('./worker.js');

    // Worker からメッセージ（処理結果）を受け取った時の処理
    worker.addEventListener('message', (e) => {
      const outputData = e.data; // Uint8ClampedArray
      const outputImageData = new ImageData(outputData, img.width, img.height);
      filteredCtx.putImageData(outputImageData, 0, 0);

      console.log('画像変換完了');
      worker.terminate(); // 処理が終わったら Worker を破棄
    });

    // Worker へデータを送信
    // imageData.data.buffer を転送可能オブジェクトとして渡すことでメモリコピーを防ぐ
    worker.postMessage(
      {
        data: imageData.data.buffer,
        width: img.width,
        height: img.height,
      },
      [imageData.data.buffer],
    );

    console.log('画像変換処理を Worker に依頼しました...');
  });

  reader.readAsDataURL(file);
});
