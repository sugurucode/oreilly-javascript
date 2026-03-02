document.getElementById('image').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;

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

    // --- ブラウザ標準の Web Worker を作成 ---
    // Node.js の worker_threads ではなく、ブラウザの Worker を使用します
    const worker = new Worker('worker.js', { type: 'module' });

    // データの送信（転送リストを使用して高速化）
    worker.postMessage(
      {
        data: imageData.data,
        w: img.width,
        h: img.height,
      },
      [imageData.data.buffer],
    );

    // 結果の受信
    worker.onmessage = (e) => {
      const { outputData } = e.data;
      const outputImageData = new ImageData(outputData, img.width, img.height);
      filteredCtx.putImageData(outputImageData, 0, 0);
      worker.terminate(); // 終了
    };

    worker.onerror = (err) => {
      console.error('Worker Error:', err);
    };
  });

  reader.readAsDataURL(file);
});
