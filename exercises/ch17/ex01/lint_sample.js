// Google Style 5.1.1: 宣言時に初期化し、1行ずつ宣言する
let a;
let x;
let y;
const r = 10;

// with (Math) {
//   a = PI * r * r;
//   x = r * cos(PI);
//   y = r * sin(PI / 2);
// }

// Google Style 5.10.1: with文を廃止し、明示的に Math オブジェクトを使用する
const { PI, cos, sin } = Math;

console.log(a, x, y);
// no-unused-varsを消すため
console.log(PI, cos, sin, r);
