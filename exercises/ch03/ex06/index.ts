// export function slice(str, indexStart, indexEnd) {
//   // TODO: ここを実装しなさい
//   return "TODO";
// }

export const slice = (str: string, indexStart?: number, indexEnd?: number): string => {
  // デフォルト値の設定
  if (indexStart === undefined) {
    indexStart = 0;
  }
  if (indexEnd === undefined) {
    indexEnd = str.length;
  }

  // NaN や Infinity の処理
  indexStart = Math.floor(isNaN(indexStart) ? 0 : indexStart);
  indexEnd = Math.floor(isNaN(indexEnd) ? indexStart : indexEnd); // 修正箇所

  // 負のインデックスを正のインデックスに変換
  if (indexStart < 0) {
    indexStart = str.length + indexStart;
  }
  if (indexEnd < 0) {
    indexEnd = str.length + indexEnd;
  }

  // 範囲外のインデックスを調整
  indexStart = Math.max(0, Math.min(indexStart, str.length));
  indexEnd = Math.max(0, Math.min(indexEnd, str.length));

  // 開始インデックスが終了インデックス以上の場合は空文字列を返す
  if (indexStart >= indexEnd) {
    return "";
  }
  let slice_str = "";
  for (let i = indexStart; i < indexEnd; i++) {
    slice_str += str[i];
  }
  return slice_str;
};
