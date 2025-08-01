// プロパティ属性をテストするためのオブジェクト
interface xyz {
  x?: string;
  y?: string;
  z?: string;
}

const obj: xyz = {};

// 各プロパティに異なる属性の組み合わせを定義
Object.defineProperty(obj, 'x', {
  value: '変更できないプロパティ',
  writable: false, // 変更不可
  enumerable: true, // 列挙可能
  configurable: true, // 削除可能
});

Object.defineProperty(obj, 'y', {
  value: '列挙できないプロパティ',
  writable: true, // 変更可能
  enumerable: false, // 列挙不可
  configurable: true, // 削除可能
});

Object.defineProperty(obj, 'z', {
  value: '削除できないプロパティ',
  writable: true, // 変更可能
  enumerable: true, // 列挙可能
  configurable: false, // 削除不可
});

// プロパティの変更テスト
console.log('\n--- プロパティの変更テスト ---');
console.log('xの初期値:', obj.x);
try {
  obj.x = '変更!'; // 変更しようとするとエラーが発生するはず
  console.log('xの変更後の値:', obj.x);
} catch (e) {
  console.log('xの変更エラー:', e.message);
}

console.log('\nyの初期値:', obj.y);
obj.y = '変更された値';
console.log('yの変更後の値:', obj.y);
// yの変更後の値: 変更された値

// プロパティの列挙テスト
console.log('\n--- プロパティの列挙テスト ---');
console.log('Object.keys(obj)の結果:', Object.keys(obj));
console.log('for...inループの結果:');
for (const key in obj) {
  console.log(key); //yだけないはず
  // for...inループの結果:
  // x
  // z
}

// プロパティの確認テスト
console.log('\n--- プロパティの確認テスト ---');
console.log('hasOwnPropertyの結果:');
// no-prototype-builtins
// 全部独自プロパティのはず
console.log('x:', Object.prototype.hasOwnProperty.call(obj, 'x'));
console.log('y:', Object.prototype.hasOwnProperty.call(obj, 'y'));
console.log('z:', Object.prototype.hasOwnProperty.call(obj, 'z'));
// yだけfalseのはず
console.log('\npropertyIsEnumerable results:');
console.log('x:', Object.prototype.propertyIsEnumerable.call(obj, 'x'));
console.log('y:', Object.prototype.propertyIsEnumerable.call(obj, 'y'));
console.log('z:', Object.prototype.propertyIsEnumerable.call(obj, 'z'));

// プロパティの削除テスト
console.log('\n--- プロパティの削除テスト ---');
console.log('プロパティの削除を試みます:');

try {
  delete obj.x;
  // hasOwnPropertyはあったらtrue→!で逆にして、削除成功してたらtrue
  console.log('xの削除結果:', !Object.prototype.hasOwnProperty.call(obj, 'x'));
} catch (e) {
  console.log('xの削除エラー:', e.message);
}

try {
  delete obj.y;
  console.log('yの削除結果:', !Object.prototype.hasOwnProperty.call(obj, 'y'));
} catch (e) {
  console.log('yの削除エラー:', e.message);
}

try {
  delete obj.z;
  console.log('zの削除結果:', !Object.prototype.hasOwnProperty.call(obj, 'z'));
} catch (e) {
  console.log('zの削除エラー:', e.message);
  // xの変更エラー: Cannot assign to read only property 'x' of object '#<Object>'
}

// suguru@A081003065:~/oreilly_javascript7$ npx tsc exercises-public/exercises/ch06/ex04/index.ts && node exercises-public/exercises/ch06/ex04/index.js

// --- プロパティの変更テスト ---
// xの初期値: 変更できないプロパティ
// xの変更エラー: Cannot assign to read only property 'x' of object '#<Object>'

// yの初期値: 列挙できないプロパティ
// yの変更後の値: 変更された値

// --- プロパティの列挙テスト ---
// Object.keys(obj)の結果: [ 'x', 'z' ]
// for...inループの結果:
// x
// z

// --- プロパティの確認テスト ---
// hasOwnPropertyの結果:
// x: true
// y: true
// z: true

// propertyIsEnumerable results:
// x: true
// y: false
// z: true

// --- プロパティの削除テスト ---
// プロパティの削除を試みます:
// xの削除結果: true
// yの削除結果: true
// zの削除エラー: Cannot delete property 'z' of #<Object>
