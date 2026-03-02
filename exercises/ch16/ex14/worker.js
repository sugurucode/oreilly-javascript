// worker_threads のインポートは不要です
self.onmessage = (e) => {
  const { data, w, h } = e.data;
  const outputData = new Uint8ClampedArray(data.length);
  const kernel = [
    1, 4, 6, 4, 1, 4, 16, 24, 16, 4, 6, 24, 36, 24, 6, 4, 16, 24, 16, 4, 1, 4, 6, 4, 1,
  ];
  const weightSum = 256;

  for (let y = 2; y < h - 2; y++) {
    for (let x = 2; x < w - 2; x++) {
      let r = 0,
        g = 0,
        b = 0;
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
      outputData[i + 3] = data[i + 3];
    }
  }

  // メインスレッドへ結果を送信
  self.postMessage({ outputData }, [outputData.buffer]);
};
