class Example {
value: number;

  constructor(value: number) {
    this.value = value;
  }
 // JavaScriptの全てのオブジェクトが継承している。
  valueOf() {
    return this.value;
  }

  toString() {
    return this.value
  }
}

// インスタンスを作成
const exampleObj = new Example(42);

// valueOf() の結果を出力
console.log(exampleObj.value + 3); // 暗黙的に呼び出される

// toString() の結果を出力
console.log(`これは${exampleObj}左文字列か？`); // 暗黙的に呼び出される