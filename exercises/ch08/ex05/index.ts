//1. 奇数番に string の値を受け取り偶数番に任意の値を受け取り、各偶数奇数のペアで `{奇数番の値: 偶数番の値}`の形式になるオブジェクトを返却する。例えば`sequenceToObject("a", 1, "b", 2)`は`{a: 1, b: 2}`を返却する
// 2. いずれかの奇数番の値が string でない場合、または値の個数の合計が偶数ではない場合は例外を発生させる
// { [key: string]: number }→{ key: string の形のプロパティを持ち、その値が number 型であるオブジェクト }
export const sequenceToObject = (...values: Array<unknown>): { [key: string]: unknown } => {
  // 値の個数の合計が偶数でない
  if (values.length % 2 !== 0) {
    throw new Error('値の個数が偶数ではありません');
  }

  const result: { [key: string]: unknown } = {};
  for (let i = 0; i < values.length; i += 2) {
    const key = values[i];
    const value = values[i + 1];
    // 奇数番の値が string でない場合
    if (typeof key !== 'string') {
      throw new Error('奇数番の値が文字列ではありません');
    }

    result[key] = value;
  }
  return result;
};
