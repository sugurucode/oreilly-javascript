## 問題点

`type="module"` を削除すると、スクリプトが**通常のスクリプト**として実行されます。現在のHTMLでは、スクリプトタグが `<head>` 内にあり、`<body>` のDOM要素よりも前に配置されています。

```html
<head>
  <script src="/exercises/ch15.01-03/ex01/index.js"></script>
  <!-- type="module" を削除した場合 -->
</head>
<body>
  <form id="new-todo-form">...</form>
  <ul id="todo-list"></ul>
</body>
```

通常のスクリプトは**即座に実行**されるため、以下のコードが実行される時点ではまだDOM要素（`#new-todo-form`、`#todo-list`など）が存在せず、`document.querySelector()` が `null` を返してエラーになります：

```javascript
const form = document.querySelector('#new-todo-form'); // null になる
const list = document.querySelector('#todo-list'); // null になる
```

## 解決方法

### 方法1: `defer` 属性を追加（推奨）

```html
<script defer src="/exercises/ch15.01-03/ex01/index.js"></script>
```

- スクリプトをバックグラウンドでダウンロードし、HTML解析が完了してから実行します
- `type="module"` と同様の遅延実行を提供します

### 方法2: スクリプトタグを `</body>` の直前に移動

```html
<body>
  <form id="new-todo-form">...</form>
  <ul id="todo-list"></ul>

  <script src="/exercises/ch15.01-03/ex01/index.js"></script>
</body>
```

- DOM要素がすでに解析された後にスクリプトが実行されます

### 方法3: `DOMContentLoaded` イベントを使用

JavaScriptコード全体を以下でラップします：

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#new-todo-form');
  const list = document.querySelector('#todo-list');
  const input = document.querySelector('#new-todo');
  // ... 残りのコード
});
```

### 方法4: `window.onload` を使用

```javascript
window.addEventListener('load', () => {
  // すべてのコード
});
```

- すべてのリソース（画像など）の読み込みを待つため、`DOMContentLoaded`より遅い

## 推奨される方法

**方法1の `defer` 属性の追加**が最もシンプルで推奨されます。コードを変更せずに、HTML側だけで解決できます。
