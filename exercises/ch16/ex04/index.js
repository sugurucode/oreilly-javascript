import fs from 'fs';
import iconv from 'iconv-lite';

// 1. ストリームを作成する
// Shift_JISで保存されたファイルを読み込むReadableストリーム
const source = fs.createReadStream('hello.txt');

// Shift_JISからUTF-8へ変換するTransformストリーム（iconv-liteを使用）
const decoder = iconv.decodeStream('Shift_JIS');

// 2. パイプラインを設定する
// ファイル -> デコーダー -> 標準出力(コンソール) とつなぐ
source
  .on('error', (err) => {
    console.error('ファイルの読み込み中にエラーが発生しました:', err.message);
  })
  .pipe(decoder)
  .on('error', (err) => {
    console.error('文字コードの変換中にエラーが発生しました:', err.message);
  })
  .pipe(process.stdout)
  .on('error', (err) => {
    console.error('コンソールへの出力中にエラーが発生しました:', err.message);
  });
