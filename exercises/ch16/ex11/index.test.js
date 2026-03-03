import net from 'net';
import server from './index.js';

describe('HTTPサーバーの基本テスト', () => {
  // すべてのテストが終わったらサーバーを閉じる
  afterAll(() => server.close());

  // サーバーにリクエストを送ってレスポンスを返す補助関数
  const request = (msg) => {
    return new Promise((resolve) => {
      const client = net.createConnection({ port: 3000 }, () => {
        client.write(msg);
      });
      client.on('data', (data) => {
        resolve(data.toString());
        client.end();
      });
    });
  };

  test('GET / でフォームが返ってくること', async () => {
    const res = await request('GET / HTTP/1.1\r\n\r\n');
    expect(res).toContain('HTTP/1.1 200 OK');
    expect(res).toContain('<form');
  });

  test('POST /greeting で挨拶が返ってくること', async () => {
    const body = 'name=Tanaka&greeting=Hello';
    const res = await request(
      `POST /greeting HTTP/1.1\r\nContent-Length: ${body.length}\r\n\r\n${body}`,
    );
    expect(res).toContain('Hello, Tanaka!');
  });

  test('存在しないパスで 404 が返ってくること', async () => {
    const res = await request('GET /nothing HTTP/1.1\r\n\r\n');
    expect(res).toContain('404 Not Found');
  });
});
