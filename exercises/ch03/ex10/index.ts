// Symbol()を使用して2つのSymbol変数を作成
const sym1 = Symbol('shared')
const sym2 = Symbol('shared')

console.log(sym1)
console.log(sym2)

// Symbol変数をプロパティとして持つオブジェクトを作成
const obj = {
  [sym1]: 'value1',
  [sym2]: 'value2',
}

// Symbol変数を使って各プロパティの値を取得
console.log(obj[sym1]) // "value1"
console.log(obj[sym2]) // "value2"

// Symbol.for()を使用して同名の変数を作成
const sym3 = Symbol.for('shared')
const sym4 = Symbol.for('shared')

// Symbol.for()で作成した変数をプロパティとして持つオブジェクトを作成
// sym3とsym4は同じSymbolを参照する。
const objFor = {
  [sym3]: 'value3',
  [sym4]: 'value4',
}

// Symbol.for()で作成した変数を使って各プロパティの値を取得
// 最後に上書きされた値が取得される。
console.log(objFor[sym3]) // "value4"
console.log(objFor[sym4]) // "value4"
