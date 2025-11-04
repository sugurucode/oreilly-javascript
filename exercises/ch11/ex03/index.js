// リトルエンディアン→ビッグエンディアン変換
function littleToBigEndian(arr) {
  // 符号なし32ビット整数配列を作成
  const result = new Uint32Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    result[i] =
      //valとAND演算で下位８ビット取得。左に24ビットシフトして上位8ビットに移動
      ((val & 0xff) << 24) |
      //  valとAND演算で次の8ビット取得。左に8ビットシフトして2番目の8ビットに移動
      ((val & 0xff00) << 8) |
      // valとAND演算で次の8ビット取得。右に8ビットシフトして3番目の8ビットに移動
      ((val & 0xff0000) >> 8) |
      // valとAND演算で上位8ビット取得。右に24ビットシフトして下位8ビットに移動
      ((val & 0xff000000) >>> 24);
  }
  return result;
}

// ビッグエンディアン→リトルエンディアン変換
function bigToLittleEndian(arr) {
  // littleToBigEndianと同じ処理
  return littleToBigEndian(arr);
}

export { littleToBigEndian, bigToLittleEndian };
