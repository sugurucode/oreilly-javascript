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
    // 画像のピクセルデータを取得
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
    // 中心に近いほど数値が大きく、遠いほど小さいため滑らかにボケるはず
    // https://www.mitani-visual.jp/mivlog/imageprocessing/gf3r89.php
    const kernel = [
      1, 4, 6, 4, 1, 4, 16, 24, 16, 4, 6, 24, 36, 24, 6, 4, 16, 24, 16, 4, 1, 4, 6, 4, 1,
    ];
    const weightSum = 256; // カーネルの合計値

    // 画像の端(2px)を除いて処理ループ
    // 畳み込みの中心が画像の端にかからないようにするため
    for (let y = 2; y < h - 2; y++) {
      for (let x = 2; x < w - 2; x++) {
        let r = 0,
          g = 0,
          b = 0;

        // 5x5 カーネル畳み込み
        // x,y を中心に -2 から +2 までループ
        for (let ky = -2; ky <= 2; ky++) {
          for (let kx = -2; kx <= 2; kx++) {
            // (y + ky) * w + (x + kx)) は画像全体の中でのピクセル位置
            // それに 4 をかけるのは RGBA 各4要素分を考慮するため
            // ようは二次元座標を一次元配列のインデックスに変換している
            const pixelIndex = ((y + ky) * w + (x + kx)) * 4;
            // カーネル内の対応する重みを取得
            const weight = kernel[(ky + 2) * 5 + (kx + 2)];

            r += data[pixelIndex] * weight;
            g += data[pixelIndex + 1] * weight;
            b += data[pixelIndex + 2] * weight;
          }
        }

        // 出力配列に結果を格納
        const i = (y * w + x) * 4; // 出力配列のインデックス
        outputData[i] = r / weightSum;
        outputData[i + 1] = g / weightSum;
        outputData[i + 2] = b / weightSum;
        outputData[i + 3] = data[i + 3]; // アルファ値維持
      }
    }

    const outputImageData = new ImageData(outputData, img.width, img.height);
    filteredCtx.putImageData(outputImageData, 0, 0);

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
