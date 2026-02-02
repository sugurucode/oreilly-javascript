### 3001に変更

`const res = await fetch('http://localhost:3001/api/tasks');`

CORSエラー

```
（インデックス）:1 Access to fetch at 'http://localhost:3001/api/tasks' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

#### index.jsの変更例

```js
const res = await fetch('http://localhost:3001/api/tasks', {
  mode: 'cors',
  credentials: 'include',
});
```

1. mode: 'cors'
   別サーバーにアクセスするための設定。

前提: ブラウザはセキュリティ上、自分のサイト以外のデータ取得を禁止（同一オリジンポリシー）。

役割: 別のサーバー（localhost:3001）にデータを取得しに行く際、CORS（クロスオリジンリソース共有）を使い、許可証を確認するようブラウザに伝える。

これがないと: セキュリティエラーでデータ取得がブロックされる可能性。

イメージ: ブラウザが「入館証（CORSヘッダ）」を確認するモード。

2. credentials: 'include'
   認証情報を送信するための設定。

前提: APIが認証を必要とする場合、クッキーやセッション情報を送信する必要があります。

役割: リクエストに認証情報（クッキーなど）を含めるようブラウザに指示します。

これがないと: 認証が必要なAPIにアクセスできず、エラーになる可能性があります。

イメージ: 認証情報を持参して「本人確認」を行う設定。

クロスオリジンにリクエストするとブラウザが勝手にプリフライトリクエストを送信する
![alt text](image.png)
