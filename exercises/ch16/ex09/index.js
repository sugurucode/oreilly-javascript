import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// ESMで __dirname を定義
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// デバッグ用エンドポイント: リクエストをエコーする
app.all('/test/mirror', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=UTF-8');

  // 1. リクエストラインの作成
  let echo = `${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`;

  // 2. ヘッダーの追加
  for (let i = 0; i < req.rawHeaders.length; i += 2) {
    echo += `${req.rawHeaders[i]}: ${req.rawHeaders[i + 1]}\r\n`;
  }

  echo += '\r\n';

  // 3. 最初にヘッダー部分を書き込み、次にボディをパイプする
  res.write(echo);
  req.pipe(res);
});

// 静的ファイルの提供
// 引数でルートディレクトリを指定できるようにエクスポート
export function createServer(rootDirectory = path.resolve(__dirname, 'public')) {
  app.use(express.static(rootDirectory));
  return app;
}

// 直接実行された場合（例: node index.js /tmp 8000）
if (process.argv[1] === __filename) {
  const root = process.argv[2] || path.resolve(__dirname, 'public');
  const port = parseInt(process.argv[3]) || 8000;
  const serverApp = createServer(root);
  serverApp.listen(port, () => console.log(`Listening on port ${port} serving ${root}`));
}

export default app;
