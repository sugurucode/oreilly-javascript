// exercises/ch13/ex08/index.js

import fs from 'fs/promises';
import path from 'path';

/**
 * ディレクトリ内の最初の「ファイル」のサイズを返す。
 * ファイルが見つからない（空、またはサブディレクトリのみ）場合は null を返す。
 */
export async function fetchFirstFileSize(dirPath) {
  try {
    const files = await fs.readdir(dirPath);

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      try {
        const stats = await fs.stat(filePath);

        // ▼▼▼▼▼ 修正点 ▼▼▼▼▼
        // stats.isFile() でファイルかどうかを必ずチェックする
        if (stats.isFile()) {
          return stats.size; // 最初のファイルを見つけたら即座にサイズを返す
        }
        // ▲▲▲▲▲ 修正点 ▲▲▲▲▲
      } catch (err) {
        // stat に失敗 (例: パーミッションエラーなど)
        console.error(`stat error for ${filePath}:`, err.message);
        // 無視して次のファイルへ
      }
    }

    // ループが完了してもファイルが見つからなかった場合
    return null;
  } catch (err) {
    // readdir に失敗 (例: ディレクトリが存在しない)
    console.error('エラーが発生しました:', err.message);
    throw err;
  }
}

/**
 * ディレクトリ内の全「ファイル」の合計サイズを返す。
 * （サブディレクトリは無視する）
 */
export async function fetchSumOfFileSizes(dirPath) {
  try {
    const files = await fs.readdir(dirPath); // index.js:40
    let total = 0;

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      try {
        const stats = await fs.stat(filePath);

        // ▼▼▼▼▼ 修正点 ▼▼▼▼▼
        // stats.isFile() でファイルかどうかを必ずチェックする
        if (stats.isFile()) {
          total += stats.size; // ファイルの場合のみ合計に加算
        }
        // ▲▲▲▲▲ 修正点 ▲▲▲▲▲
      } catch (err) {
        // stat に失敗
        console.error(`stat error for ${filePath}:`, err.message);
        // 無視して次のファイルへ
      }
    }

    return total; // callback(null, total) の代わりに total を返す
  } catch (err) {
    // readdir に失敗
    console.error('エラーが発生しました:', err.message);
    throw err;
  }
}
