export class TypeMap {
  constructor() {
    // Map と同様のインタフェースを持つ（内部的に Map を利用）
    this.map = new Map();
  }

  // key はコンストラクタ関数に限定する
  set(constructor, value) {
    // set では、コンストラクタ関数の key とそのクラスの value のみ受け付ける
    if (!(value instanceof constructor)) {
      // プリミティブ値はラッパークラスのコンストラクタ関数で get/set 可能
      if (
        (constructor === String && typeof value === 'string') ||
        (constructor === Number && typeof value === 'number') || // valueが数値型か判定
        (constructor === Boolean && typeof value === 'boolean')
      ) {
        this.map.set(constructor, value);
        return;
      }
      // 型が合わない場合はエラー
      throw new Error('TypeMap: valueはkeyで指定した型のインスタンスである必要があります');
    }
    this.map.set(constructor, value);
  }

  // key はコンストラクタ関数のみ受け付ける
  get(constructor) {
    return this.map.get(constructor);
  }
}

// 使用例
class Foo {}
const typeMap = new TypeMap();
typeMap.set(String, 'string'); // プリミティブ値（ラッパークラス）
typeMap.set(Number, 123); // プリミティブ値（ラッパークラス）
typeMap.set(Foo, new Foo()); // クラスインスタンス
// typeMap.set(Date, "not a date"); // 型が合わない場合はエラー
console.log(typeMap.get(String)); // "string"
console.log(typeMap.get(Number)); // 123
