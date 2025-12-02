// unwritableAndUnconfigurableObj: { a: 1 } の a を書き換え・削除不可
export const unwritableAndUnconfigurableObj = () => {
  const obj = { a: 1 };
  Object.defineProperty(obj, 'a', {
    writable: false,
    configurable: false,
  });
  return obj;
};

// writableAndUnconfigurableObj: { b: 2 } の b を削除不可、値は書き換え可能
export const writableAndUnconfigurableObj = () => {
  const obj = { b: 2 };
  Object.defineProperty(obj, 'b', {
    writable: true,
    configurable: false,
  });
  return obj;
};

// nestedUnwritableObj: ネストした全てのプロパティが書き換え不可・追加不可
// 後で再帰で書いてみる。
export const nestedUnwritableObj = () => {
  const obj = { c: { d: { e: 3 } } };
  Object.defineProperty(obj, 'c', { writable: false, configurable: false });
  Object.preventExtensions(obj); // 最上位オブジェクトも拡張不可にする

  Object.defineProperty(obj.c, 'd', { writable: false, configurable: false });
  Object.preventExtensions(obj.c);

  Object.defineProperty(obj.c.d, 'e', { writable: false, configurable: false });
  Object.preventExtensions(obj.c.d);

  Object.preventExtensions(obj.c.d.e);

  return obj;
};
