### グローバルオブジェクト (Global Object)

コード全体からアクセス可能な、実行環境が提供するプロパティとメソッドを持つ単一のオブジェクト。グローバル変数のコンテナ（グローバル変数がいっぱい入ってる入れ物）となる。

---

了解した。前の回答から、グローバルオブジェクトの**参照方法**に関する部分を、見出しとサンプルコードを用いたMarkdown形式で再構成する。

---

## グローバルオブジェクトを参照する方法

### 1. ブラウザ環境内での参照: `window`

ブラウザ環境（メインスレッド）でのみ利用可能な、伝統的な参照方法。

```javascript
// ブラウザ環境でのみ利用可能
console.log(window === globalThis); // true

// window プロパティを使った例
window.alert('Hello Browser!');
```

### 2 Node.js環境内での参照: `global`

Node.js環境でのみ利用可能な参照方法。

```javascript
// Node.js環境でのみ利用可能
console.log(global === globalThis); // true

// globalオブジェクトにプロパティ追加してglobalthis経由で表示
global.customProperty = 'Node Global';
console.log(globalThis.customProperty);
```

### 3 ブラウザ node 問わず: `globalThis`

ES2020で標準化された、ブラウザ、Node.js、Web Workerなど、**全ての環境でグローバルオブジェクトを指す**ためのプロパティ。

```javascript
// どの環境でもグローバルオブジェクトを参照
console.log(typeof globalThis); // 'object'

// 環境に依存しないタイマー設定
globalThis.setTimeout(() => {
  console.log('This runs universally.');
}, 0);
```

---

### ブラウザ独自のプロパティ・メソッド (10種)

Node.jsにはなく、ブラウザ環境に固有の主要なプロパティとメソッド

1.  `document`
2.  `location`
3.  `history`
4.  `localStorage`
5.  `sessionStorage`
6.  `fetch()`
7.  `alert()`
8.  `requestAnimationFrame()`
9.  `screen`
10. `navigator`

---

### `undefined` の定義と過去の問題

**確認:**
グローバルオブジェクトには `undefined` がプロパティとして定義されている(index.tsで確認)

**過去の問題 (ES3まで):**
グローバルオブジェクトの `undefined` プロパティが**書き換え可能 (writable)** だった。これにより、コードによって `undefined` が上書きされる可能性があり、予期せぬバグに繋がる可能性があった。

```javascript
// 仮想的な危険なコード
undefined = '何か別の値';

var foo = undefined; // このとき、fooには "何か別の値" が入ってしまう
if (foo === undefined) {
  // この比較も、意図した「未定義」との比較にならない
  // ...
}
```

**解決:**

- ECMAScript 5 (ES5) 以降、`undefined` プロパティは**読み取り専用 (readonly)** となり、上書きが不可能になった。

- ESlintのルールを使う
  https://eslint.org/docs/latest/rules/no-undefined
  ここにも同様の問題が書いてある。
