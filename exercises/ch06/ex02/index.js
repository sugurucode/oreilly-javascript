// 独自プロパティを持つオブジェクトを定義
var proto = { name: 'aa', age: 20 };
// そのオブジェクトをプロトタイプとして持つ新しいオブジェクト生成しなさい
var newObj = Object.create(proto);
// プロトタイプがprotoであることを確認
console.log(Object.getPrototypeOf(newObj) === proto);
// trueが出力されるはず
