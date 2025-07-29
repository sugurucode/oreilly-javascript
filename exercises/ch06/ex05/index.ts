// プロトタイプとなるオブジェクトを作成
const proto = {
  // プロパティ名が数値のプロパティ
  1: 'number1',
  2: 'number2',
  // プロパティ名が文字列のプロパティ
  str: 'string',
  // 列挙可能なプロパティ（中括弧でオブジェクト作成（オブジェクトリテラル）したらデフォで列挙可能）
  enum: { a: 'enum1', b: 'enum2' },
};

const newObj = Object.create(proto, {
  // プロパティ名が数値かつプロトタイプの数値プロパティと同名のプロパティ
  1: { value: 'newNumber1', enumerable: true },
  // プロパティ名が数値かつプロトタイプの数値プロパティと同名でないプロパティ
  3: { value: 'newNumber3', enumerable: true },
  // プロパティ名が文字列かつプロトタイプの文字列プロパティと同名のプロパティ
  str: { value: 'newString', enumerable: true },
  // プロパティ名が文字列かつプロトタイプの文字列プロパティと同名でないプロパティ
  newStr: { value: 'newString2', enumerable: true },
  // 列挙不可かつプロトタイプの列挙可能プロパティと同名のプロパティ
  enum: { value: { c: 'enum3', d: 'enum4' }, enumerable: false },
});

// for inループで確認keyとvalueを出力
for (const key in newObj) {
  console.log(`${key}: ${newObj[key]}`);
}
