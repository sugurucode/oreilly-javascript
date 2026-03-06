import net from 'net';

const formHtml = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Greeting Form</title>
  </head>
  <body>
    <form action="/greeting" method="POST">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" />
      <label for="greeting">Greeting:</label>
      <input type="text" id="greeting" name="greeting" />
      <button type="submit">Submit</button>
    </form>
  </body>
</html>`;

// Serverオブジェクトを作成し、接続の待ち受けを開始する
// netはNode.jsの組み込みモジュールで、ここではTCPサーバーを作成するために使用する
// TCPサーバーとは、HTTPプロトコルを理解していない生のソケット通信を行うサーバーのこと。HTTPリクエストを受け取るためには、
// TCPサーバーを作成して、受け取ったデータをHTTPリクエストとして解析する必要がある。
const server = net.createServer((socket) => {
  // クライアントの接続がわかるように
  console.log('Client connected!');
  // クライアントからデータが送られてきたときの処理
  socket.on('data', (data) => {
    // 受け取ったデータはBufferオブジェクトなので、toString()で文字列に変換する
    // なぜBufferかというと、TCP通信はバイナリデータのやりとりを行うため、Node.jsは受け取ったデータをBufferオブジェクトとして提供するから。
    // HTTPリクエストはテキスト形式なので、文字列に変換してから解析する必要がある。
    const request = data.toString();

    // ヘッダーとボディは空行(\r\n\r\n)で区切られる
    // \r\nはHTTPの改行コードで、\r\n\r\nはヘッダーの終わりを示す。これを使ってリクエストをヘッダー部分とボディ部分に分割。
    const parts = request.split('\r\n\r\n');
    // ヘッダー部分はさらに行ごとに分割して配列にする
    const headerLines = parts[0].split('\r\n');
    // ボディ部分は、ヘッダーとボディを分割した後の2番目の要素。もしボディがない場合は空文字列にする。
    const body = parts[1] || '';

    // ヘッダーの最初の行はリクエストラインと呼ばれ、HTTPメソッド、パス、HTTPバージョンがスペースで区切られている。これを分割して取得。
    const [method, path] = headerLines[0].split(' ');
    console.log(`Received request: ${method} ${path}`);

    if (method === 'GET' && path === '/') {
      // /にGETリクエストが来たら、フォームを返す
      // レスポンスのお作法的に、HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n のように
      // ステータスラインとヘッダーを先に書いてから、空行を入れて、その後にHTMLの内容を書く。
      const response = `HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n${formHtml}`;
      socket.write(response);
      socket.end(); // データを書き込んだらソケットを閉じる
    } else if (method === 'POST' && path === '/greeting') {
      //  1.のフォームから`/greeting`に POST されたとき、nameとgreeting の内容をボディに含む HTML を返却する
      let name = '';
      let greeting = '';
      // bodyは、name=John&greeting=Helloのような形式。
      body.split('&').forEach((pair) => {
        // name=John と greeting=Hello のようなペアに分割して、さらに=で分割してキーと値を取得する。
        const [key, value] = pair.split('=');
        // キーがnameならnameに値を、キーがgreetingならgreetingに値をセットする。
        // 日本語が含まれる可能性があるので、decodeURIComponentでデコード。
        if (key === 'name') name = decodeURIComponent(value || '');
        if (key === 'greeting') greeting = decodeURIComponent(value || '');
      });
      const resultHtml = `<!doctype html><html lang="ja"><head><meta charset="UTF-8"><title>Result</title></head><body><h1>${name} ${greeting}</h1></body></html>`;
      const response = `HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n${resultHtml}`;
      socket.write(response);
      socket.end();
    } else {
      // 1.2.3.で非対応のパスとメソッドの組み合わせでアクセスされた場合、HTTP のプロトコルにしたがい 404 または 405 を返す
      // 405 Method Not Allowed は、リクエストされたリソースは存在するが、そのHTTPメソッドは許可されていない場合に返すステータスコード。
      if (path === '/' || path === '/greeting') {
        const response = `HTTP/1.1 405 Method Not Allowed\r\nContent-Type: text/plain\r\n\r\n405 Method Not Allowed`;
        socket.write(response);
        socket.end();
      } else {
        // 404 Not Found は、リクエストされたリソースが存在しない場合に返すステータスコード。
        const response = `HTTP/1.1 404 Not Found\r\nContent-Type: text/plain\r\n\r\n404 Not Found`;
        socket.write(response);
        socket.end();
      }
    }
  });
});

// ポート3000で待ち受け
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

export default server; // テストでサーバーを閉じるためにエクスポートする
