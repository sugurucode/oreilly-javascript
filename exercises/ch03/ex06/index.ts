// export function slice(str, indexStart, indexEnd) {
//   // TODO: ここを実装しなさい
//   return "TODO";
// }

export const slice = (
  str: string,
  indexStart: number = 0,
  indexEnd: number = str.length,
): string => {
  // NaNの処理
  // slice("Hello World!", NaN, 2) => "He"
  indexStart = Math.floor(isNaN(indexStart) ? 0 : indexStart)
  // slice("Hello World!", 2, NaN) => ""
  indexEnd = Math.floor(isNaN(indexEnd) ? indexStart : indexEnd)

  // 負→正に変換。
  if (indexStart < 0) {
    indexStart = str.length + indexStart
  }
  if (indexEnd < 0) {
    indexEnd = str.length + indexEnd
  }

  // 範囲外のインデックスを調整
  // slice("Hello World!", 100, 2) => ""
  // indexStartにindex.length採用
  indexStart = Math.max(0, Math.min(indexStart, str.length))
  // slice("Hello World!", 2, 100) => "llo World!"
  indexEnd = Math.max(0, Math.min(indexEnd, str.length))
  // slice("Hello World!", 7, 2) => ""
  // 開始インデックスが終了インデックス以上の場合は空文字列を返す
  if (indexStart >= indexEnd) {
    return ''
  }
  let slice_str = ''
  for (let i = indexStart; i < indexEnd; i++) {
    slice_str += str[i]
  }
  return slice_str
}
