// strict モード（with 文は構文エラー）
'use strict';
let a = 1;
let b = 2;
let obj = { a: 3, b: 4 };
with (obj) {
  a = b;
}
console.log({ a, b, obj });
// strict モードでは SyntaxError になる
