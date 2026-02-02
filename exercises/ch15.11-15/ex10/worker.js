// /home/suguru/oreilly_javascript7_fix/exercises-public/exercises/ch15.11-15/ex10/worker.js

self.addEventListener('message', (e) => {
  const { data, width, height } = e.data;

  // 元の画像データ (Uint8ClampedArray)
  const inputData = new Uint8ClampedArray(data);
  const outputData = new Uint8ClampedArray(inputData.length);

  const w = width;
  const h = height;

  // 5x5 ガウシアンカーネル
  const kernel = [
    1, 4, 6, 4, 1, 4, 16, 24, 16, 4, 6, 24, 36, 24, 6, 4, 16, 24, 16, 4, 1, 4, 6, 4, 1,
  ];
  const weightSum = 256;

  // 画像の端(2px)を除いて処理ループ
  for (let y = 2; y < h - 2; y++) {
    for (let x = 2; x < w - 2; x++) {
      let r = 0,
        g = 0,
        b = 0;

      for (let ky = -2; ky <= 2; ky++) {
        for (let kx = -2; kx <= 2; kx++) {
          const pixelIndex = ((y + ky) * w + (x + kx)) * 4;
          const weight = kernel[(ky + 2) * 5 + (kx + 2)];

          r += inputData[pixelIndex] * weight;
          g += inputData[pixelIndex + 1] * weight;
          b += inputData[pixelIndex + 2] * weight;
        }
      }

      const i = (y * w + x) * 4;
      outputData[i] = r / weightSum;
      outputData[i + 1] = g / weightSum;
      outputData[i + 2] = b / weightSum;
      outputData[i + 3] = inputData[i + 3];
    }
  }

  // 処理結果をメインスレッドに送信
  // outputData.buffer を転送可能オブジェクトとして指定し、コピーを避けて高速化
  self.postMessage(outputData, [outputData.buffer]);
});
