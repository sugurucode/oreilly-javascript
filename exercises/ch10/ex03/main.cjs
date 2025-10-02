// module.jsから関数とクラスを取得(nodeのモジュール形式)
const { sum, Rectangle } = require('./module.cjs');

console.log(sum(3, 5)); // 8

const rect = new Rectangle(4, 6);
console.log(rect.area()); // 24

// node /home/suguru/oreilly_javascript7/exercises/ch10/ex03/main.cjs
