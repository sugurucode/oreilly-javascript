/**
import { abs } from '../../ch01/ex05/index';
 * instanceof と等価な関数。instanceofは使わない。
 * @param object 判定したいオブジェクト
 * @param constructor 判定したいコンストラクタ
 * @returns boolean
 */
export function instanceOf(
  object: unknown,
  // unknown型の配列を受け取って、その配列をnewで
  //new constructor(args)でインスタンス化できる
  //constructoeの引数は何個でもOK
  //返り値は任意のオブジェクト
  constructor: new (...args: unknown[]) => unknown,
): boolean {
  // objectにプリミティブ型が入っている場合はfalseを返す
  if (typeof object !== 'object' || object === null) return false;
  // objectのプロトタイプチェーンをprotoに代入
  let proto = Object.getPrototypeOf(object);
  // 調べたいコンストラクタのprototypeを取得
  const prototype = constructor.prototype;
  //プロトタイプチェーンをたどるとA.prototypeにたどり着く
  while (proto) {
    console.log(proto);

    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

class A {}
class B extends A {
  name: string;
  constructor() {
    super();
    this.name = 'B';
  }
}
// インスタンスcにAのプロパティはない
class C extends B {}
const c = new C();
// console.log(c); // B { name: 'B' }
// オブジェクトcはAのインスタンスか？
instanceOf(c, A); // true
// B {}
// A {}
// {}
