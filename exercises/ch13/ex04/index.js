import * as fs from 'node:fs/promises';
import * as path from 'node:path';

/**
 * ディレクトリ内の最初のファイルのサイズを取得する (Promise 版)
 * @param {string} dirPath ディレクトリのパス
 * @returns {Promise<number | null>} ファイルサイズ (ファイルがない場合は null)
 */
export async function fetchFirstFileSize(dirPath) {
  // 1. ディレクトリを読み取る
  const files = await fs.readdir(dirPath);

  // 2. ファイルがなければ null を返す
  if (files.length === 0) {
    return null;
  }

  // 3. 最初のファイルのパスを構築
  const firstFilePath = path.join(dirPath, files[0]);

  // 4. ファイルの統計情報 (stat) を取得
  const stats = await fs.stat(firstFilePath);

  // 5. ファイルサイズを返す
  return stats.size;
}

/**
 * ディレクトリ内の全ファイルの合計サイズを取得する (Promise 版)
 * @param {string} dirPath ディレクトリのパス
 * @returns {Promise<number>} 合計ファイルサイズ
 */
export async function fetchSumOfFileSizes(dirPath) {
  // 1. ディレクトリを読み取る
  const files = await fs.readdir(dirPath);

  // 2. 各ファイルの stat 取得処理 (Promise) の配列を作成
  const statPromises = files.map((file) => {
    const filePath = path.join(dirPath, file);
    return fs.stat(filePath);
  });

  // 3. すべての stat 取得処理を並行して実行
  const statsArray = await Promise.all(statPromises);

  // 4. 全てのファイルサイズを合計する
  const totalSize = statsArray.reduce((total, stats) => {
    return total + stats.size;
  }, 0); // 初期値 0

  return totalSize;
}
