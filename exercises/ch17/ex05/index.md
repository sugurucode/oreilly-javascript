##　バンドル
`npx webpack ./ex05/index.js --mode production --output-path ./ex05/dist`

1. バンドル前の計測
ex05/index.html を開き、<script type="module" src="./index.js"></script> になっていることを確認。

ターミナルで npm run serve を実行。

ブラウザで http://localhost:3000/ex05/ を開く。

開発者ツール（F12）の「ネットワーク」タブを開き、リロード（Ctrl+R）。

リクエスト数（Requests） と 完了時間（Finish） をメモする。

2. バンドル後の計測
ターミナルで npm run build を実行。（ex05/dist/main.js が更新される）

ex05/index.html を書き換え： <script defer src="./dist/main.js"></script> にする。

ブラウザに戻ってリロード。

同じく リクエスト数 と 完了時間 をメモして、バンドル前と比較する。