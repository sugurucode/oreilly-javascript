# 問題 15.11-15.16 🖋

## 課題内容

実際のサービスの通信をデベロッパーツールで調査し、ブラウザから呼び出し可能なAPIの CORS の設定を確認

---

## APIレスポンスヘッダーの詳細

デベロッパーツールで確認したAPIレスポンスヘッダーの内容。それぞれのヘッダーについての説明

### ヘッダー一覧と説明

- **`access-control-allow-credentials`**: `true`

  - クレデンシャル（CookieやHTTP認証情報など）を含むリクエストを許可するかどうかを示す

- **`access-control-allow-origin`**: `https://www.map.proto.ricoh-reserve.com`

  - このAPIが許可するオリジン（リクエスト元のURL）を指定。この場合、`https://www.map.proto.ricoh-reserve.com`からのリクエストが許可されている

- **`cache-control`**: `no-cache`

  - キャッシュの制御を行うヘッダー。`no-cache`はキャッシュを使用せず、常に最新のリソースを取得することを指示

- **`connection`**: `keep-alive`

  - 接続を維持するかどうかを示す。`keep-alive`は接続を維持し、複数のリクエストを同じ接続で処理することを意味

- **`content-encoding`**: `gzip`

  - レスポンスの圧縮形式を示す。この場合、`gzip`形式で圧縮されている

- **`content-type`**: `application/json; charset=utf-8`

  - レスポンスのデータ形式と文字エンコーディングを指定。この場合、JSON形式でUTF-8エンコーディング

- **`date`**: `Mon, 02 Feb 2026 12:27:35 GMT`

  - レスポンスが生成された日時を示す

- **`request-context`**: `appId=cid-v1:f0c2e18a-f9c5-4465-a879-d1c1b813d2fd`

  - リクエストに関連するコンテキスト情報を含むヘッダー

- **`strict-transport-security`**: `max-age=31536000; includeSubDomains; preload`

  - HTTPSを強制するためのヘッダー。`max-age`は有効期間を秒単位で指定。`includeSubDomains`はサブドメインにも適用されることを示す

- **`transfer-encoding`**: `chunked`

  - レスポンスがチャンク（分割）されて送信されることを示す

- **`vary`**: `Accept-Encoding,Origin`

  - キャッシュのバリエーションを指定。この場合、`Accept-Encoding`と`Origin`ヘッダーの値によってレスポンスが変わる可能性がある

- **`x-content-type-options`**: `nosniff`

  - ブラウザがMIMEタイプを推測しないようにするセキュリティヘッダー

- **`x-ms-middleware-request-id`**: `00000000-0000-0000-0000-000000000000`
  - マイクロソフトのミドルウェアによって生成されたリクエストID

---

## 課題に対する回答

### CORSの設定確認

- **`access-control-allow-origin`**: このヘッダーにより、`https://www.map.proto.ricoh-reserve.com`からのリクエストのみが許可されていることがわかる
- **`access-control-allow-credentials`**: `true`が設定されているため、クレデンシャルを含むリクエストが許可されている

これらの設定により、特定のオリジンからのリクエストのみを許可し、セキュリティを確保していることが確認できる

### 注意点

- 他のオリジンからのリクエストを許可する場合は、`access-control-allow-origin`の値を変更する必要がある
- クレデンシャルを許可する場合は、セキュリティリスクを十分に考慮する必要がある
