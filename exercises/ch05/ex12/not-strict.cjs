// 非 strict モード（with 文が使える）
let a = 1;
let b = 2;
let obj = { a: 3, b: 4 };
// eslint-disable-next-line no-with
with (obj) {
  a = b;
}
console.log({ a, b, obj });
// 出力: { a: 1, b: 2, obj: { a: 4, b: 4 } }
