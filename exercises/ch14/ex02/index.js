export class MyArrayLike {
  constructor(...args) {
    // 引数なしの場合は this.length = 0 で初期化する。
    if (args.length === 0) {
      this.length = 0;
    }
    // 引数が1つでMyArrayLikeの場合、その要素で初期化する。
    else if (args.length === 1 && args[0] instanceof MyArrayLike) {
      const arr = args[0];
      this.length = arr.length;
      for (let i = 0; i < arr.length; i++) {
        this[i] = arr[i];
      }
    }
    // 引数が1つで配列の場合、その配列の要素で初期化する。
    else if (args.length === 1 && Array.isArray(args[0])) {
      const arr = args[0];
      this.length = arr.length;
      for (let i = 0; i < arr.length; i++) {
        this[i] = arr[i];
      }
    } else {
      // 引数が複数の場合、その引数の要素で初期化する。
      this.length = args.length;
      for (let i = 0; i < args.length; i++) {
        this[i] = args[i];
      }
    }
  }
  // Array.from(result) でイテレートできるように（テストの expect(Array.from(result))... に対応）
  // オブジェクトを井寺ブルにする。
  [Symbol.iterator]() {
    let i = 0;
    return {
      // nextという名前のプロパティにアロー関数代入
      // MyArray.map()を使えるようにする
      next: () => ({
        // 次の要素を返す
        value: this[i],
        // 終わったかどうか
        // thisはMyArrayLikeのインスタンス
        done: i++ >= this.length,
      }),
    };
  }
}

// MyArrayはArrayを継承し、map(), slice()の結果としてMyArrayLikeのオブジェクトを返す。
// （結果の型を変更するにはSymbol.speciesを指定する）
// MyArrayLikeは配列のようなクラスでArrayを継承しない

export class MyArray extends Array {
  constructor(items) {
    super(...items);
  }
  // TODO
  // Symbol.species: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol/species
  // mapやsliceの返り値の型をMyArrayLikeに変更
  static get [Symbol.species]() {
    return MyArrayLike;
  }
}
