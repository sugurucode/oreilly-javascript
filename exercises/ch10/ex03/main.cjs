// module.jsから関数とクラスを取得
const { greet, Person } = require('./module.cjs');

// 関数の利用例
console.log(greet('太郎'));

// クラスの利用例
const p = new Person('花子');
console.log(p.sayHello());

// node /home/suguru/oreilly_javascript7/exercises/ch10/ex03/main.cjs
