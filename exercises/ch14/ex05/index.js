/**
 * タグ付きテンプレートリテラル関数
 * @param {string[]} strings - 文字列の固定部分の配列
 * @param {...any} values - 埋め込まれた変数の配列 (${...}の中身)
 */
export function template(strings, ...values) {
  let result = '';

  // 固定部分(strings)の数だけループを回します
  // 例: `a${v1}b${v2}` の場合、stringsは ['a', 'b', ''] の3つになります
  for (let i = 0; i < strings.length; i++) {
    // 1. 固定文字列を結果に追加
    result += strings[i];

    // 2. もし対応する変数(values)があれば、その「型」を追加
    // stringsの方がvaluesより常に1つ要素が多いため、
    // values[i] が存在するかチェックします
    if (i < values.length) {
      const value = values[i];
      const typeName = typeof value; // 'string', 'number', 'object' など取得

      result += typeName;
    }
  }

  return result;
}
