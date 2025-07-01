# 練習問題 3.14

## letを使用した場合

```js
for (let i = 0; i < 10; i++) {
  ;(function () {
    let i = 100
  })()
  console.log(i)
}
console.log(i)
```

### 予想

```
0
1
2
3
4
5
6
7
8
9
参照できない系のエラー
```

### 結果

```
0
1
2
3
4
5
6
7
8
9
/home/suguru/oreilly_javascript7/exercises-public/exercises/ch03/ex14/index.ts:8
console.log(i);
            ^
ReferenceError: i is not defined
```

### 理由：

- let iはfor文内でのみ使えるローカル変数。その外はスコープ外。
- function内で定義されているlet i=100もfunction内のみのローカル変数
- ループ内の`console.log(i)`は、forループ内で定義されたiの値（0から9）を出力
- ループ外の`console.log(i)`は、forの外のため`i`が定義されていない状態となる。
- tsのファイルをtscでjsに変換したらvarになった。。。

## varを使用した場合

```js
for (var i = 0; i < 10; i++) {
  ;(function () {
    var i = 100
  })()
  console.log(i)
}
console.log(i)
```

### 予想

```
0
1
2
3
4
5
6
7
8
9
ReferenceError: i is not defined
```

### 結果

```
0
1
2
3
4
5
6
7
8
9
10
```

理由：

- `var` は関数スコープを持つ。forループ内で宣言された `i` は関数全体で有効。ループ内外で同じ変数 `i` を参照できます。
- function内で宣言された `var i = 100` は、その関数内でのみ有効。このため、ループ内の `i` の値には影響を与えません。
- 関数全体でiは有効なため、最後のiにはforで定義したiが出力される。
- i++なので9回目ループの終了で10にインクリメントされて終了する

### 変数宣言キーワードを省略した場合（非strictモード）

```js
for (i = 0; i < 10; i++) {
  ;(function () {
    i = 100
  })()
  console.log(i)
}
console.log(i)
```

### 予想

```
0
1
2
3
4
5
6
7
8
9
ReferenceError: i is not defined
```

### 結果

```
suguru@A081003065:~/oreilly_javascript7$ node -e "eval('for (i = 0; i < 10; i++) { (function () { i = 100; })(); console.log(i); } console.log(i);')"
100
101
```

理由：

- 非strictモードでは変数宣言を省略するとグローバル変数となる。
- function内のiが最初のループで表示される。
- forの条件を越しているので、一回でループ終了
- i++なのでループ外のlogで101が表示される。
