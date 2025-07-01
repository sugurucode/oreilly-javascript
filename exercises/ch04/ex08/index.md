### 昔void 0が使われていた理由

昔のJavaScriptでは、`undefined` はグローバル変数として定義されていた。つまり他のコードによって値を書き換えられる危険がある。そのため、常に`undefined`を返す`void 0`を使った方が安全であった。

```js
alert(undefined) // "undefined"
var undefined = 'こんにちは'
alert(undefined) // "こんにちは"
```

### 今ではそんな書き方しない理由

現在のJavaScript（ES5以降）では`undefined`は書き換えられなくなったので安全に比較できる。可読性の観点からundefinedになった。
