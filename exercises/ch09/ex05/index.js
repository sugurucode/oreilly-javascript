/**
import { abs } from '../../ch01/ex05/index';
 * instanceof と等価な関数。instanceofは使わない。
 * @param object 判定したいオブジェクト
 * @param constructor 判定したいコンストラクタ
 * @returns boolean
 */
export function instanceOf(object, 
// unknown型の配列を受け取って、その配列をnewで
//new constructor(args)でインスタンス化できる
//constructoeの引数は何個でもOK
//返り値は任意のオブジェクト
constructor) {
    // objectにプリミティブ型が入っている場合はfalseを返す
    if (typeof object !== 'object' || object === null)
        return false;
    // objectのプロトタイプチェーンをprotoに代入
    let proto = Object.getPrototypeOf(object);
    // 調べたいコンストラクタのprototypeを取得
    const prototype = constructor.prototype;
    //プロトタイプチェーンをたどるとA.prototypeにたどり着く
    while (proto) {
        console.log(proto);
        if (proto === prototype)
            return true;
        proto = Object.getPrototypeOf(proto);
    }
    return false;
}
class A {
}
class B extends A {
    name;
    constructor() {
        super();
        this.name = 'B';
    }
}
// インスタンスcにAのプロパティはない
class C extends B {
}
const c = new C();
// console.log(c); // B { name: 'B' }
// オブジェクトcはAのインスタンスか？
instanceOf(c, A); // true
// B {}
// A {}
// {}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsVUFBVSxDQUN4QixNQUFlO0FBQ2YsOEJBQThCO0FBQzlCLGtDQUFrQztBQUNsQyx1QkFBdUI7QUFDdkIsZUFBZTtBQUNmLFdBQWdEO0lBRWhELGtDQUFrQztJQUNsQyxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxNQUFNLEtBQUssSUFBSTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQ2hFLDZCQUE2QjtJQUM3QixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFDLDJCQUEyQjtJQUMzQixNQUFNLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO0lBQ3hDLGtDQUFrQztJQUNsQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVuQixJQUFJLEtBQUssS0FBSyxTQUFTO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDckMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVELE1BQU0sQ0FBQztDQUFHO0FBQ1YsTUFBTSxDQUFFLFNBQVEsQ0FBQztJQUNmLElBQUksQ0FBUztJQUNiO1FBQ0UsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUNsQixDQUFDO0NBQ0Y7QUFDRCxxQkFBcUI7QUFDckIsTUFBTSxDQUFFLFNBQVEsQ0FBQztDQUFHO0FBQ3BCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7QUFDbEIscUNBQXFDO0FBQ3JDLHFCQUFxQjtBQUNyQixVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTztBQUN6QixPQUFPO0FBQ1AsT0FBTztBQUNQLEtBQUsifQ==