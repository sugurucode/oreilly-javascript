// strings[]: テンプレートリテラルの固定文字列部分の配列
// values[]: テンプレートリテラルの変数部分の配列
// 例: template`a${v1}b${v2}` の場合、stringsは ['a', 'b', '']、valuesは [v1, v2]
export function template(strings, ...values) {
  let result = '';
  console.log('strings', strings);
  console.log(values);

  // 例: `a${v1}b${v2}` の場合、stringsは ['a', 'b', ''] の3つになる
  for (let i = 0; i < strings.length; i++) {
    // 1. 固定文字列を結果に追加
    result += strings[i];

    // 2. もし対応する変数(values)があれば、その「型」を追加
    if (i < values.length) {
      const value = values[i];
      const typeName = typeof value; // 'string', 'number', 'object' など取得

      result += typeName;
    }
  }

  return result;
}
