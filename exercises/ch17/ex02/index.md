## pollyに苦戦

- octkit使っているのが原因
replayモードでもトークン付けないと401エラー
 `auth: process.env.GITHUB_TOKEN || 'fake-token-for-replay', `

 Pollyは「ヘッダーがあるレコーディング」と「ヘッダーがないリクエスト」を別物とみなすため、常にヘッダーを存在させることでレコーディングデータに確実にヒットするようになった。

 `retry: { enabled: false }`
 octokitは一回目にトークン無しでリクエストをGithubに投げる。当然401でそれがpollyはレコーディングに記録してしまうのでリプレイモードでエラーがでる。

 →ヘッダーにトークンを必ず付けて、retryを無効にすると一回目からトークン付きでリクエストする
 
 `request:{fetch}`
 octokitは内部で標準のfetchを使用
pollyはこれをキャッチできないので、node-fetchを明示的に指定して、Pollyがリクエストをキャッチできるようにする。
  