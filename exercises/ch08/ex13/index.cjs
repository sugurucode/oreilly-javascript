function f(input) {
  const f = new Function(`return "Hello, " + ${input}`);
  console.log(f());
}

// hacked.txt というファイルを作成する危険な入力例(node v22意向は使えない)
//f('require("fs").writeFileSync("hacked.txt", "hacked")');

// 関数実行できる
f('Math.random()');
// suguru@A081003065:~/oreilly_javascript7$ node exercises-public/exercises/ch08/ex13/index.cjs
// Hello, 0.3513426707319671

// 危険な入力例
// f('process.exit()') // サーバーが終了する可能性あり
