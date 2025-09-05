```出力
function max() { [native code] }
function displayHello(){return"Hello"}
```

`function max() { [native code] }`
javaScriptエンジン内部でC++などの低レベル言語で実装されているからでるらしい。

`function displayHello(){return"Hello"}`
自作の関数、特にアロー関数を含む場合、ECMAScript仕様では関数宣言文の文字列を返すことになっています。
ほとんどのJavaScript処理系では、これは関数のソースコード全体を返します

```p233
関数はJavaScript のオブジェクトですので、toString()メソッドを持ちます。ECMAScript仕
様では、このメソッドは関数宣言文の文字列を返すことになっています。ほとんどの処理系では、
toString() メソッドは関数のソースコード全体を返します。組み込み関数の場合は、関数本体
は"[native code]"という文字列になるのが普通です。
```
