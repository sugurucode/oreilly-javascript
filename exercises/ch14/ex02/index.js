export class MyArrayLike {
  // TODO
  constructor(items) {
    if (typeof items === 'number') {
      // itemsが数値（要素数）の場合
      // インスタンスのlengthプロパティを設定する
      this.length = items;
    } else {
      // itemsがイテラブルの場合 (例: slice/mapで生成された要素の配列)
      let index = 0;
      // thisはMyArrayLikeのインスタンス。
      // インスタンスの値を設定する
      for (const item of items) {
        this[index] = item;
        index++;
      }
      // インスタンスのlengthプロパティを設定する
      this.length = index;
    }
  }

  // テストでArray.from(result)が使われているため、
  // MyArrayLikeをイテラブルにする必要がある。
  [Symbol.iterator]() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const items = this;
    let index = 0;

    return {
      next: () => {
        // itemsのlengthプロパティを参照して終了判定を行う
        if (index < items.length) {
          return { value: items[index++], done: false };
        } else {
          return { done: true };
        }
      },
    };
  }
}

export class MyArray extends Array {
  constructor(items) {
    super(...items);
  }

  // TODO
  // map(), slice()の結果としてMyArrayLikeのオブジェクトを返すには、
  // Symbol.speciesにMyArrayLikeを設定する必要がある。
  // staticを付けることで。array.map((x) => x * x); のように
  // MyArrayのインスタンスからもアクセスできるようになる。
  static get [Symbol.species]() {
    return MyArrayLike;
  }
}
