export {};
// import lodash from "lodash"; // 修正: lodashをデフォルトインポート
// const { isEqual } = lodash;

const obj1 = {x: 1} as { x: number, y?: number }; //TypeScriptではasがないとできない

// 問題: ここに1行コードを書くことで以下の行で {x: 1, y: 2} が出力されること
obj1.y = 2;

console.log(obj1);

const obj2 = { x: 1, y: 2 };
// 問題: 以下の行では何が出力されるか、予想してから結果を確認しなさい
console.log(obj1 === obj2); //予想：false 理由：参照を比較しているから。

// オブジェクト比較は以下のライブラリ使用
//console.log(isEqual(obj1, obj2));
// TypeScriptでは、オブジェクトのキーが文字列であることを明示的に示すために、
// []を使用してプロパティ名を指定する必要があります。
export const equals = (o1: { [key: string]: unknown } | number |null, o2: { [key: string]: unknown } | number | null): boolean => {
  // 1.厳密等価の場合
  if (o1 === o2) return true;

  // 2.null またはオブジェクト以外の場合
  if (typeof o1 !== "object" || typeof o2 !== "object" || o1 === null || o2 === null) {
    return false;
  }

  // 3.プロパティの数と名前を比較
  const keys1 = Object.keys(o1); // プロパティ名を配列で返す
  const keys2 = Object.keys(o2);

  // プロパティの数が異なる場合は等しくない
  if (keys1.length !== keys2.length) return false;
  // プロパティ名が異なる場合は等しくない
  // .every()は配列内の全ての要素が指定した条件を満たす場合にtrueを返す
  // !で否定しているので、keys1の全ての要素がkeys2に含まれていない場合はfalseを返す
  if (!keys1.every((key) => keys2.includes(key))) return false;

  // 4.プロパティの各値を比較()
  for (const key of keys1) {
    if (!equals(o1[key] as { [key: string]: unknown }, o2[key] as { [key: string]: unknown })) {
      return false;
    }
  }
  return true;
}

