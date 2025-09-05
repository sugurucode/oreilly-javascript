// 任意のオブジェクトのすべての独自プロパティ（protoから継承したものではない
// および列挙可能な継承プロパティのプロパティ名の配列を返す
export const getAllPropertyKeysArry = (obj: object): (string | symbol)[] => {
  //getOwnPropertyNames(obj):objが持つ全ての文字列名のプロパティを配列で返す
  const ownNames = Object.getOwnPropertyNames(obj);
  //getOwnPropertySymbols(obj):objが持つ全てのシンボル名のプロパティを配列で返す
  const ownSymbols = Object.getOwnPropertySymbols(obj);
  const result: (string | symbol)[] = [...ownNames, ...ownSymbols];

  // 列挙可能な継承プロパティ（Symbolは必須でないので除外）
  for (const key in obj) {
    console.log(`key: ${key}`);
    if (!ownNames.includes(key)) {
      result.push(key);
    }
  }
  return result;
};
