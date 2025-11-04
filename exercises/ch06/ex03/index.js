let o = {}; // o はObject.prototype からメソッドを継承し、
o.x = 1; // 独自プロパティx を持つ。
let p = Object.create(o); // p はo とObject.prototype からプロパティを継承し、
p.y = 2; // 独自プロパティy を持つ。
let q = Object.create(p); // q は、p、o、Object.prototype からプロパティを継承し、
q.z = 3; // 独自プロパティz を持つ。
console.log(q.toString()); // toString はObject.prototype から継承する
console.log(q.x + q.y); // => 3; x とy はそれぞれo とp から継承する

// o, p, q の継承関係を確認
// Object.prototype.isPrototypeOf.call(o, p) は o.isPrototypeOf(p) と同じ意味
// ESLint の "no-prototype-builtins"を回避 。
console.log('o は p のプロトタイプチェーン上に存在する:', o.isPrototypeOf.call(p)); // true
console.log(
  'o は q のプロトタイプチェーン上に存在する:',
  Object.prototype.isPrototypeOf.call(o, q),
); // true
console.log(
  'p は q のプロトタイプチェーン上に存在する:',
  Object.prototype.isPrototypeOf.call(p, q),
); // true

// 組み込みオブジェクトのプロトタイプチェーンを確認
const array = [];
const date = new Date();
const map = new Map();

console.log('\n組み込みオブジェクトのプロトタイプチェーン:');
console.log(
  'Object.prototype は Array のプロトタイプチェーン上に存在する:',
  Object.prototype.isPrototypeOf.call(Object.prototype, Array.prototype),
); // true
console.log(
  'Object.prototype は Date のプロトタイプチェーン上に存在する:',
  Object.prototype.isPrototypeOf.call(Object.prototype, Date.prototype),
); // true
console.log(
  'Object.prototype は Map のプロトタイプチェーン上に存在する:',
  Object.prototype.isPrototypeOf.call(Object.prototype, Map.prototype),
); // true

// インスタンスのプロトタイプチェーンも確認
console.log('\nインスタンスのプロトタイプチェーン:');
console.log(
  'Array.prototype は array のプロトタイプチェーン上に存在する:',
  Object.prototype.isPrototypeOf.call(Array.prototype, array),
); // true
console.log(
  'Date.prototype は date のプロトタイプチェーン上に存在する:',
  Object.prototype.isPrototypeOf.call(Date.prototype, date),
); // true
console.log(
  'Map.prototype は map のプロトタイプチェーン上に存在する:',
  Object.prototype.isPrototypeOf.call(Map.prototype, map),
); // true
