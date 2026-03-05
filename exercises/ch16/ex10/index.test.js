import request from 'supertest';
import { createServer } from './index.js';
import fs from 'fs'; // 【追加】実際にファイルが作られたか確認・削除するために必要
import path from 'path'; // 【追加】ファイルのパスを計算するために必要

// テスト対象のアプリ（カレントディレクトリをルートとして設定）
const app = createServer('./');

describe('HTTPサーバーの動作テスト', () => {
  // 1. /test/mirror エンドポイントのテスト
  test('/test/mirror が送った内容をそのまま返すこと', async () => {
    const message = 'こんにちは、サーバーさん';
    // supertestを使うことで、サーバーを実際に起動せずに、HTTPリクエストをシミュレートしてテストできる。
    // ここでは、POSTリクエストを送っているが、app.all('/test/mirror')で定義したルートはすべてのHTTPメソッドにマッチするため、POSTでもGETでも同じように動作するはず。
    const response = await request(app).post('/test/mirror').send(message);

    expect(response.status).toBe(200);
    expect(response.text).toContain('POST /test/mirror HTTP/1.1'); // リクエストラインが含まれるか
    expect(response.text).toContain(message); // 送ったボディが含まれるか
  });

  // 2. 静的ファイル配信のテスト
  test('存在するjsonファイルを取得できること', async () => {
    const response = await request(app).get('/ast1.json');

    expect(response.status).toBe(200);
    expect(response.header['content-type']).toContain('application/json');
  });

  // 3. 404エラーのテスト
  test('存在しないファイルにアクセスしたら 404 を返すこと', async () => {
    const response = await request(app).get('/hoge.txt');

    expect(response.status).toBe(404);
    expect(response.text).toBe('Not Found'); // エラーメッセージが正しいか
  });

  // 【追加】PUTによるファイルアップロードのテスト
  test('PUTリクエストで新しい階層にファイルをアップロードできること', async () => {
    const uploadData = 'PUTリクエストのテスト';
    const testUrlPath = '/test-dir/test-upload.txt';

    // サーバーにPUTリクエストでデータを送信する
    const response = await request(app).put(testUrlPath).send(uploadData);

    // サーバーから「アップロード完了」の返事が来ているか？
    expect(response.status).toBe(200);
    expect(response.text).toContain('アップロード完了');

    // 🌟 実際にファイルが作られたか
    const testUploadFileLocation = path.resolve('./', 'test-dir/test-upload.txt');
    // existsSyncでファイルが存在するか確認する。存在しない場合はテスト失敗。
    expect(fs.existsSync(testUploadFileLocation)).toBe(true);
    // ファイルの中身が、アップロードしたデータと同じか確認する。違う場合はテスト失敗。
    expect(fs.readFileSync(testUploadFileLocation, 'utf8')).toBe(uploadData); // 中身が一致するか？
  });
  // いらないのでフォルダ削除
  afterAll(() => {
    const testDirPath = path.resolve('./', 'test-dir');
    if (fs.existsSync(testDirPath)) {
      fs.rmSync(testDirPath, { recursive: true, force: true });
    }
  });
});
