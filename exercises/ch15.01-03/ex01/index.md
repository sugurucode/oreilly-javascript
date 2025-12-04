## 問題点

`type="module"` を削除すると、スクリプトが**通常のスクリプト**として実行されます。
つまり、HTMLの読み込み中でも過ぎに実行される。

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

moduluがないとき、
以下のコードが実行される時点でDOM要素（`#new-todo-form`、`#todo-list`など）が存在せず、`document.querySelector()` が `null` を返してエラー：

```javascript
const form = document.querySelector('#new-todo-form'); // null になる
const list = document.querySelector('#todo-list'); // null になる
```

## 解決方法

### 方法1: `defer` 属性を追加（推奨）

```html
<script defer src="/exercises/ch15.01-03/ex01/index.js"></script>
```

- スクリプトをバックグラウンドでダウンロードし、HTML解析が完了してから実行

### 方法2: スクリプトタグを `</body>` の直前に移動

```html
<body>
  <form id="new-todo-form">...</form>
  <ul id="todo-list"></ul>

  <script src="/exercises/ch15.01-03/ex01/index.js"></script>
</body>
```

- DOM要素がすでに解析された後にスクリプトが実行されます
