class Example {
  // JavaScriptの全てのオブジェクトが継承している。
  valueOf() {
    return 10
  }

  toString() {
    return 'Hello, World!'
  }
}

// インスタンスを作成
const obj = new Example()

// valueOf()の結果を直接呼ばずに出力（暗黙の型変換を利用）
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
console.log(obj + 1) // 11（obj.valueOf()が呼ばれる）

// toString()の結果を直接呼ばずに出力（暗黙の型変換を利用）
console.log(`${obj}`) // "Hello, World!"（obj.toString()が呼ばれる）
