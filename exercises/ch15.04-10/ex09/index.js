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
    const data = imageData.data;

    // グレースケールへの変換 (RGB を足して平均を取っている)
    //
    // ガウシアンフィルタを実装する場合はこの周辺のコードを変更しなさい
    // imageData の中身はそのままに別の配列に結果を格納するとよい

    // Uint8ClampedArray を使って新しい配列を作成（8bit符号なし）
    const outputData = new Uint8ClampedArray(imageData.data.length);
    const w = img.width;
    const h = img.height;

    // 5x5 ガウシアンカーネル
    const kernel = [
      1, 4, 6, 4, 1, 4, 16, 24, 16, 4, 6, 24, 36, 24, 6, 4, 16, 24, 16, 4, 1, 4, 6, 4, 1,
    ];
    const weightSum = 256; // カーネルの合計値

    // 画像の端(2px)を除いて処理ループ
    for (let y = 2; y < h - 2; y++) {
      for (let x = 2; x < w - 2; x++) {
        let r = 0,
          g = 0,
          b = 0;

        // 5x5 カーネル畳み込み
        for (let ky = -2; ky <= 2; ky++) {
          for (let kx = -2; kx <= 2; kx++) {
            const pixelIndex = ((y + ky) * w + (x + kx)) * 4;
            const weight = kernel[(ky + 2) * 5 + (kx + 2)];

            r += data[pixelIndex] * weight;
            g += data[pixelIndex + 1] * weight;
            b += data[pixelIndex + 2] * weight;
          }
        }

        const i = (y * w + x) * 4;
        outputData[i] = r / weightSum;
        outputData[i + 1] = g / weightSum;
        outputData[i + 2] = b / weightSum;
        outputData[i + 3] = data[i + 3]; // アルファ値維持
      }
    }

    const outputImageData = new ImageData(outputData, img.width, img.height);
    filteredCtx.putImageData(outputImageData, 0, 0);

    // ▲▲▲ 追加したコードここまで ▲▲▲

    // 元のグレースケール処理は不要なためコメントアウト
    /* for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
    }

    filteredCtx.putImageData(imageData, 0, 0);
    */
  });

  reader.readAsDataURL(file);
});
