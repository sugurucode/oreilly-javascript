import fs from 'fs';
import { createServer } from './index.js';

// メモリ使用量をMB単位で取得する関数
// 実験の前後でこの関数を呼び出して、どれくらいメモリが増えたかを確認するために使います。
// process.memoryUsage()で今のメモリ使用量を取得
// rssで実際に占有しているメモリの合計サイズを取得
// それをMBに変換して返す
const getMemoryMB = () => Math.round(process.memoryUsage().rss / 1024 / 1024);

async function runTest() {
  console.log('=== メモリ使用量 確認テスト ===');

  // 1. サーバーを起動
  const app = createServer('./');
  const server = app.listen(8000, () => {
    console.log('✅ あなたのサーバーをポート8000で起動しました');
  });

  // 2. 実験用の約100MBの巨大ファイルを作成
  const filename = 'file.txt';
  console.log('⏳ 100MBのダミーファイルを作成中...');
  // Aは1バイトなので、100 * 1024 * 1024で100MB分のAを作る
  fs.writeFileSync(filename, Buffer.alloc(100 * 1024 * 1024, 'A'));

  console.log(`\n--- 実験開始 (現在のメモリ: ${getMemoryMB()} MB) ---`);

  // ==========================================
  // 【実験1】 fs.createReadStream
  // ==========================================
  const startMemStream = getMemoryMB();

  await fetch('http://localhost:8000/upload-stream.txt', {
    method: 'PUT',
    body: fs.createReadStream(filename),
    duplex: 'half',
  });

  const endMemStream = getMemoryMB();
  console.log(`🌟 fs.createReadStream のメモリ増加量: ${endMemStream - startMemStream} MB`);

  // ガベージコレクションを促すために1秒待つ
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // ==========================================
  // 【実験2】 fs.read
  // ==========================================
  const startMemRead = getMemoryMB();

  // 昔ながらの fs.read はコールバック方式なので、Promiseで包んで綺麗に待機させます
  const buffer = await new Promise((resolve, reject) => {
    // まずファイルを開いて番号(fd)をもらう
    fs.open(filename, 'r', (err, fd) => {
      // ファイルを開くのに失敗したらエラーを返す
      if (err) return reject(err);
      // statSyncでファイルサイズを取得
      const stats = fs.statSync(filename);
      // そのサイズ分の空のBufferをメモリに作る
      const buf = Buffer.alloc(stats.size);

      // fs.readでファイルからデータを読み込む
      // fd: ファイルディスクリプタ
      // buf: 読み込んだデータを格納するためのBuffer
      // 0: bufのどこから書き始めるか（今回は0から）
      // stats.size: いくつのバイトを読み込むか（今回はファイル全体のサイズ分）
      // 0: ファイルのどこから読み始めるか（今回は先頭から）
      fs.read(fd, buf, 0, stats.size, 0, (readErr, bytesRead, resultBuffer) => {
        fs.closeSync(fd); // 読み終わったらファイルを閉じる

        if (readErr) reject(readErr);
        else resolve(resultBuffer); // 読み込んだデータ(100MB分)を次に渡す
      });
    });
  });

  await fetch('http://localhost:8000/upload-read.txt', {
    method: 'PUT',
    body: buffer,
  });

  const endMemRead = getMemoryMB();
  console.log(`fs.read のメモリ増加量: ${endMemRead - startMemRead} MB`);

  // ==========================================
  // お片付け
  // ==========================================
  fs.unlinkSync(filename); // file.txt を削除
  fs.unlinkSync('upload-stream.txt');
  fs.unlinkSync('upload-read.txt');
  server.close();
  console.log('\n✅ 実験完了！ file.txt とテストデータを片付けました。');
}

runTest();
