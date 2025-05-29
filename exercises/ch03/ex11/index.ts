export {};
const obj1 = { x: 1 ,y:2};
// 問題: ここに1行コードを書くことで以下の行で {x: 1, y: 2} が出力されること
console.log(obj1);

const obj2 = { x: 1, y: 2 };
// 問題: 以下の行では何が出力されるか、予想してから結果を確認しなさい
console.log(obj1 === obj2); //予想：true→falseだった...
// 予想が外れた理由を考えなさい
// obj1とobj2は異なるオブジェクトなので参照が異なる
// trueになるのは以下

export const equals = (o1: Record<string, unknown> | null, o2: Record<string, unknown> | null): boolean => {
  // 厳密等価の場合
  if (o1 === o2) return true;

  // null またはオブジェクト以外の場合
  if (typeof o1 !== "object" || typeof o2 !== "object" || o1 === null || o2 === null) {
    return false;
  }

  // プロパティの数・名前が一致しない場合
  const keys1 = Object.keys(o1);
  const keys2 = Object.keys(o2);
  if (keys1.length !== keys2.length) return false;
  if (!keys1.every((key) => keys2.includes(key))) return false;

  // プロパティの各値を再帰的に比較
  for (const key of keys1) {
    if (!equals(o1[key] as Record<string, unknown>, o2[key] as Record<string, unknown>)) {
      return false;
    }
  }
  return true;
}
