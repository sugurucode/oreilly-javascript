// 高階関数：関数を引数として受け取ったり、返したりする関数
// 残余パラメータ： ...args

// 1. 残余パラメータとして任意の数の関数を受け取り、いずれかの関数が true を返せば true を返す新たな関数を返す`any` 関数
// any関数の実装
export function any(...fns) {
  return function (arg) {
    for (const fn of fns) {
      // いずれかの関数がtrueを返せばtrueを返す
      if (fn(arg)) {
        return true;
      }
    }
    return false;
  };
}

const isNonZero = any(
  (n) => n > 0,
  (n) => n < 0,
);

console.log(isNonZero(0)); // => false
console.log(isNonZero(42)); // => true
console.log(isNonZero(-0.5)); // => true

// 2.  引数として 2 つの関数を受け取り、1 つ目の関数で発生した例外を 2 つ目の関数の引数として処理し結果を返す新たな関数を返す`catching` 関数
// catching関数の実装
export function catching(tryFn, catchFn) {
  return function (arg) {
    try {
      return tryFn(arg);
    } catch (e) {
      return catchFn(e);
    }
  };
}

const safeJsonParse = catching(JSON.parse, (e) => {
  return { error: e.toString() };
});

console.log(safeJsonParse('{"a": 1}')); // => {a: 1}
console.log(safeJsonParse('{Invalid Json}')); // => {error: "SyntaxError: ..."}
