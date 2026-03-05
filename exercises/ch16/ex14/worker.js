// メインスレッドからデータを受け取った時に発火するイベント
self.onmessage = (event) => {
  // メインスレッドから送られてきた「画像データ、幅、高さ」を取り出す
  const { data, width: w, height: h } = event.data;

  // Uint8ClampedArray を使って新しい配列を作成（8bit符号なし）
  const outputData = new Uint8ClampedArray(data.length);
  // ここはindex.jsから送ってくる
  // const w = img.width;
  // const h = img.height;

  // 5x5 ガウシアンカーネル
  // 中心に近いほど数値が大きく、遠いほど小さいため滑らかにボケるはず
  // https://www.mitani-visual.jp/mivlog/imageprocessing/gf3r89.php
  const kernel = [
    1, 4, 6, 4, 1, 4, 16, 24, 16, 4, 6, 24, 36, 24, 6, 4, 16, 24, 16, 4, 1, 4, 6, 4, 1,
  ];
  const weightSum = 256;

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

  // 計算が終わったら、完成した outputData をメインスレッドに送り返す！
  self.postMessage(outputData);
};
