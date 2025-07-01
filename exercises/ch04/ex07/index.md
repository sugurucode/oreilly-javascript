### evalとは

`eval`は、与えられた文字列をJavaScriptのコードとして実行する関数。  
例えば`eval("x = 1 + 2")`と書くと`x`に `3`が代入される。

### set42に意図しない動作をさせるには

`set42`関数は、引数`key`をそのまま変数名として `eval` で実行。  
このため、`key`に「変数代入」以外のコードを含めることで、任意の JavaScript コードを実行できる。

## なぜ'a; console.log("hacked") //'でhackedが実行される？

```js
a
console.log('hacked') // = 42;
```

このコードは、

1. `console.log("hacked")` で "hacked" を出力
2. `// = 42;` でコメントアウト
