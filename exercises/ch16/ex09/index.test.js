import request from 'supertest';
import { createServer } from './index.js';
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Express Server Tests', () => {
  let tempDir;
  let app;

  beforeAll(() => {
    // テスト用のターゲットディレクトリを作成
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'server-test-'));
    fs.writeFileSync(path.join(tempDir, 'hello.txt'), 'Hello, World!');
    app = createServer(tempDir);
  });

  afterAll(() => {
    // テスト用ディレクトリの削除
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  test('GET /test/mirror returns echoed request headers', async () => {
    const response = await request(app)
      .post('/test/mirror')
      .set('X-Test-Header', 'Value123')
      .send('Echo this body');

    expect(response.status).toBe(200);
    expect(response.text).toContain('POST /test/mirror');
    expect(response.text).toContain('X-Test-Header: Value123');
    expect(response.text).toContain('Echo this body');
  });

  test('GET a static file returns 200 and content', async () => {
    const response = await request(app).get('/hello.txt');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, World!');
    expect(response.header['content-type']).toContain('text/plain');
  });

  test('GET non-existent file returns 404', async () => {
    const response = await request(app).get('/notfound.html');
    expect(response.status).toBe(404);
  });
});
