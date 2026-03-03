import http from 'http';
import fs from 'fs';
import path from 'path';

export function serve(rootDirectory, port) {
  let server = new http.Server();
  server.listen(port);
  console.log('Listening on port', port);

  server.on('request', (request, response) => {
    let endpoint = new URL(request.url, `http://${request.headers.host}`).pathname;
    let filename = path.resolve(rootDirectory, endpoint.substring(1).replace(/\.\.\//g, ''));

    // PUT メソッドによるアップロード処理
    if (request.method === 'PUT') {
      // 保存先ディレクトリが存在することを確認
      fs.mkdirSync(path.dirname(filename), { recursive: true });

      let writeStream = fs.createWriteStream(filename);

      // リクエスト(ストリーム)をファイル(ストリーム)へ流し込む
      request.pipe(writeStream);

      writeStream.on('finish', () => {
        response.writeHead(201); // Created
        response.end('File uploaded successfully');
      });

      writeStream.on('error', (err) => {
        response.writeHead(500);
        response.end(err.message);
      });
    }
    // GET メソッド（既存のファイル提供処理）
    else if (request.method === 'GET') {
      let stream = fs.createReadStream(filename);
      stream.once('readable', () => {
        response.setHeader('Content-Type', 'application/octet-stream');
        response.writeHead(200);
        stream.pipe(response);
      });
      stream.on('error', (err) => {
        response.writeHead(404);
        response.end(err.message);
      });
    }
  });
}

serve(process.argv[2] || './uploads', 8000);

// test.txt というファイルを hello.txt という名前で保存するように送る
// suguru@A081003065:~/oreilly_javascript7_fix/exercises-public/exercises/ch16/ex10$
// curl -X PUT --data-binary @test.txt http://localhost:8000/myfiles/hello.txt
