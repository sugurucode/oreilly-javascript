// 高階関数：関数を引数として受け取ったり、返したりする関数
// 残余パラメータ： ...args

// 1. 残余パラメータとして任意の数の関数を受け取り、いずれかの関数が true を返せば true を返す新たな関数を返す`any` 関数
export function any(...funcs) {
  // some：配列の要素のうち、1つでも条件を満たすものがあれば true を返す
  // 若干処理がわからない。。。
  return (value) => funcs.some((fn) => fn(value));
}

const isNonZero = any(
  (n) => n > 0,
  (n) => n < 0,
);

console.log(isNonZero(0)); // => false
console.log(isNonZero(42)); // => true
console.log(isNonZero(-0.5)); // => true

// 2.  引数として 2 つの関数を受け取り、1 つ目の関数で発生した例外を 2 つ目の関数の引数として処理し結果を返す新たな関数を返す`catching` 関数
export function catching(tryFn, catchFn) {
  return (value) => {
    try {
      return tryFn(value);
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
