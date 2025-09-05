// 独自プロパティを持つオブジェクトを定義
const proto = { name: 'aa', age: 20 };

// そのオブジェクトをプロトタイプとして持つ新しいオブジェクト生成しなさい
const newObj = Object.create(proto);

// プロトタイプがprotoであることを確認
console.log(Object.getPrototypeOf(newObj) === proto);
// true
