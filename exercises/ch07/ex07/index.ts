/**
 * バブルソートによる配列のソート実装
 * 時間計算量: O(n²)
 * https://zenn.dev/joeee/articles/42277d5fa2328b
 * 文字配列は考えない
 */

export const sort = (
  array: number[],
  compare: (lhs: number, rhs: number) => number = (lhs, rhs) => (lhs <= rhs ? -1 : +1),
): number[] => {
  const len = array.length;

  // 配列を順番に走査し、隣接する要素を比較して必要に応じて交換する
  // 最大の要素が末尾に移動するため、内側のループの範囲は徐々に小さくなる
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      // 隣接する要素を比較し、必要に応じて交換
      if (compare(array[j], array[j + 1]) > 0) {
        // 要素の交換
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }

  return array;
};

export function sortInsert(array, compare = (lhs, rhs) => (lhs < rhs ? -1 : lhs > rhs ? +1 : 0)) {
  // array[0 ... i-1] が常にソート済みになるように処理を進める
  // (0 <= j < i-1 に対して compare(array[j], array[j + 1]) <= 0 が成り立つ)
  for (let i = 1; i < array.length; i++) {
    const v = array[i];

    // array[i] を array[0 ... i] の適切な場所に挿入する
    let j = i;
    while (j > 0 && compare(array[j - 1], v) > 0) {
      array[j] = array[j - 1];
      j--;
    }
    array[j] = v;
  }
  return array;
}
