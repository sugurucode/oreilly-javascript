import express from 'express';

// テスト用にExpressアプリケーションを返す関数
export function createServer(rootDirectory) {
  // http,url,path,fsを使っていた部分は、Expressの機能で置き換えることができる。
  const app = express();
  // EXPRESSのミドルウェアは、書いた順番に処理されるため、ルーティングの順序が大事

  // 1. /test/mirror エンドポイント
  // app.allはすべてのHTTPメソッド（GET, POST, PUT, DELETEなど）にマッチするルートハンドラを定義するためのExpressのメソッド。
  // 元はif文でリクエストURLをチェックしていたが、Expressのルーティング機能を使うことで、より簡潔に特定のパスに対する処理を定義できる。
  app.all('/test/mirror', (req, res) => {
    // 元と同じ
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    res.status(200);

    // 元と同じ
    // Expressの req オブジェクトから情報を取得して書き出し
    // req.originalUrl を使うことでクエリパラメータも含めた完全なパスを取得
    res.write(`${req.method} ${req.originalUrl} HTTP/${req.httpVersion}\r\n`);

    // 元と同じ
    const headers = req.rawHeaders;
    for (let i = 0; i < headers.length; i += 2) {
      res.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
    }
    // ヘッダの末尾に空行を追加する。
    res.write('\r\n');

    // リクエストボディをレスポンスにパイプするのは元と同じ
    req.pipe(res);
  });

  // 2. ローカルディレクトリからファイルを提供する
  // 拡張子に基づいて、ファイルのコンテンツタイプを推測
  // パス中の「../」を禁止するセキュリティ対策は、express.staticが自動的に行う
  // ファイルを読み込むためのストリームを作成するためのコードは、express.staticが内部で自動で行う
  // ストリームをレスポンスにパイプするためのコードも、express.staticが内部で自動で行う
  // rootDirectoryを指定し、リクエストが来たときに、ルートディレクトリからファイルを提供するようにする。
  app.use(express.static(rootDirectory));

  // 3. ファイルが見つからなかった場合の404処理
  app.use((req, res) => {
    res.status(404).type('text/plain; charset=UTF-8').send('Not Found');
  });

  return app;
}
