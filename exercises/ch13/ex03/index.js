import * as fs from 'node:fs';
import { promisify } from 'node:util';

// fs.readdir:成功すると、ディレクトリ内のファイル名の配列を返す
// fs.stat:成功すると、ファイルやディレクトリの情報を含む fs.Stats オブジェクトを返す

export function readdirPromise(path, options) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, options, (err, files) => {
      if (err) {
        // エラーがあれば reject で失敗を通知
        reject(err);
        return;
      }
      // 成功し、結果 (files) があれば resolve で結果を返す
      resolve(files);
    });
  });
}

// 使用例
// readdirPromise('./exercises/ch13/ex03/directory')
//   .then((files) => console.log(files))
//   .catch((err) => console.error(err)); // [ 'test1.txt', 'test2.txt' ]

export function statPromise(path, options) {
  return new Promise((resolve, reject) => {
    fs.stat(path, options, (err, stats) => {
      // エラーがあれば reject
      if (err) {
        reject(err);
        return;
      }
      // 成功したら結果 (stats) を resolve
      resolve(stats);
    });
  });
}

// 使用例
// statPromise('./exercises/ch13/ex03/directory/test1.txt')
//   .then((stats) => console.log('Is File:', stats))
//   .catch((err) => console.error(err));
// fs.Stats オブジェクトの主なプロパティ:
// dev: ファイルが存在するデバイスの ID
// mode: ファイルの型とアクセス権（パーミッション）
// nlink: ファイルのハードリンク数
// uid: ファイル所有者のユーザー ID
// gid: ファイル所有者のグループ ID
// rdev: 特殊ファイルの場合のデバイス ID（通常は 0）
// blksize: ファイルシステムのブロックサイズ（バイト単位）
// ino: ファイルの inode 番号（ファイルシステム内の一意な識別子）
// size: ファイルのサイズ（バイト単位）
// blocks: ファイルが占有するブロック数
// atimeMs: 最終アクセス時刻（ミリ秒単位の UNIX 時間）
// mtimeMs: 最終更新時刻（ミリ秒単位の UNIX 時間）
// ctimeMs: 最終状態変更時刻（ミリ秒単位の UNIX 時間、パーミッション変更なども含む）
// birthtimeMs: ファイル作成時刻（ミリ秒単位の UNIX 時間）

// promisify を使った簡易版
export const readdirPromisify = promisify(fs.readdir);

export const statPromisify = promisify(fs.stat);
