import fs from 'fs';
import iconv from 'iconv-lite';

// createdReadStreamは、指定したファイルを読み込むためのReadStreamを作成する。
// ファイルが存在しない場合や、アクセス権がない場合はエラーが発生する。
const stream = fs.createReadStream('hello.txt');

// Shift_JISからUTF-8へ変換するTransformストリーム（iconv-liteを使用）
// iconv.decodeStreamは、指定した文字コードでデコードするTransformストリームを作成する。
// ここでは、Shift_JISでエンコードされたデータをUTF-8に変換するためのストリームを作成している。
// 逆にUTF-8からShift_JISへの変換は、iconv.encodeStreamを使用する。
const decoder = iconv.decodeStream('Shift_JIS');

// パイプラインを設定する
// ファイル -> デコーダー -> 標準出力(コンソール) とつなぐ
stream
  .pipe(decoder) // streamがdecoderの入力になる
  .pipe(process.stdout); // decoderの出力が標準出力の入力になる
