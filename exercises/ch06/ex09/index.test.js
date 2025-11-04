test('括弧ないと動かなかったのでつける', () => {
  const mock = jest.fn();

  const obj = {
    x: 0,
    y: 0,
    sum() {
      mock();
      return this.x + this.y;
    },
  };

  // --- 方針 ---
  // 元のsumは関数なので、JSON.stringifyで列挙されず出力できない。
  // getterとしてsumを再定義することで、sumがプロパティとして列挙され、JSON.stringifyで値が出力されるようになる。

  // ここに１行のコードを書く
  // 第2引数はプロパティ名を指定するための文字列。オブジェクトのどのプロパティを定義・変更するかを示す。
  // sumを書き換えるために、Object.definePropertyを使用。
  Object.defineProperty(obj, 'sum', {
    get() {
      mock();
      return this.x + this.y;
    },
    // これで列挙可能になる
    enumerable: true,
  });

  obj.x = 1;
  obj.y = 2;
  expect(JSON.stringify(obj)).toBe(`{"x":1,"y":2,"sum":3}`);
  expect(mock).toHaveBeenCalled();
});
