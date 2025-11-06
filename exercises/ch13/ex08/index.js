import * as fs from 'node:fs/promises';
import * as path from 'node:path';

// 変わらない？？
export async function fetchFirstFileSize(dirPath) {
  const files = await fs.readdir(dirPath);
  if (files.length === 0) {
    return null;
  }

  // 最初のファイルのパスを構築
  const firstFilePath = path.join(dirPath, files[0]);

  // ファイル情報取得
  const stats = await fs.stat(firstFilePath);

  // ファイルサイズを返す
  return stats.size;
}

export async function fetchSumOfFileSizes(dirPath) {
  // fs.readdir を await で呼び出す (コールバックが不要になる)
  // エラーが発生した場合、この関数が Promise.reject(err) を返す
  const files = await fs.readdir(dirPath); //[ 'file1.txt', 'file2.txt', ... ]

  let total = 0;

  // 問題13.4のiter()をawaitを使って同期っぽくforで書く
  for (const file of files) {
    const stats = await fs.stat(path.join(dirPath, file));
    total += stats.size;
  }

  // 最初の iter() を呼び出し、最終的な合計値 (total) を return する
  return total;
}
