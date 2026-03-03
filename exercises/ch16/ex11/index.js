import net from 'net';

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    const request = data.toString();
    // 変数名を付けずにカンマだけ置く
    const [headerLine] = request.split('\r\n');
    const [method, path] = headerLine.split(' ');

    // 1. "/" への GET リクエスト
    if (method === 'GET' && path === '/') {
      const body = `<!doctype html>
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
      socket.write('HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n' + body);
      socket.end();

      // 2. "/greeting" への POST リクエスト
    } else if (method === 'POST' && path === '/greeting') {
      // ボディ部分の抽出（簡易実装）
      const bodyPart = request.split('\r\n\r\n')[1];
      const params = new URLSearchParams(bodyPart);
      const name = params.get('name') || 'unknown';
      const greeting = params.get('greeting') || 'hello';

      const responseBody = `<html><body><h1>${greeting}, ${name}!</h1></body></html>`;
      socket.write(
        'HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n' + responseBody,
      );
      socket.end();

      // 3. 非対応のパス (404) または メソッド (405)
    } else if (path !== '/' && path !== '/greeting') {
      socket.write('HTTP/1.1 404 Not Found\r\n\r\n');
      socket.end();
    } else {
      socket.write('HTTP/1.1 405 Method Not Allowed\r\n\r\n');
      socket.end();
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default server; // テストのためにサーバーをエクスポート
