import { promises as fs } from 'fs'; // fs.promises を import
import * as path from 'path';

/**
 * 指定されたパスを再帰的に探索する非同期ジェネレータ
 * @param {string} rootPath 探索を開始するパス
 */
export async function* walk(rootPath) {
  let stats;
  try {
    // lstat を使い、シンボリックリンク(ショートカット)をたどらない (非同期)
    stats = await fs.lstat(rootPath);
  } catch (e) {
    // 存在しないパスや権限エラーの場合は何もしない
    console.error(`Error stating path ${rootPath}: ${e.message}`);
    return;
  }

  // 1. ディレクトリの場合
  if (stats.isDirectory()) {
    // まず自分自身（ディレクトリ）を yield する
    yield { path: rootPath, isDirectory: true };

    // 次に、中身を読み取って再帰処理する
    let entries;
    try {
      // readdir でディレクトリ内のエントリ名一覧を取得 (非同期)
      entries = await fs.readdir(rootPath);
    } catch (e) {
      // ディレクトリが読み取れない場合は何もしない
      console.error(`Error reading directory ${rootPath}: ${e.message}`);
      return;
    }

    // 各エントリに対して再帰的に walk を呼び出す
    for (const entry of entries) {
      const fullPath = path.join(rootPath, entry);
      // yield* を使って、再帰呼び出し先の非同期ジェネレータが返す値を
      // すべてこのジェネレータから yield する
      yield* walk(fullPath);
    }
  }
  // 2. ファイルの場合
  else if (stats.isFile()) {
    // ファイルを yield する
    yield { path: rootPath, isDirectory: false };
  }
  // 3. シンボリックリンクやその他の場合は無視する
}

// --- 利用例 (コメントアウト解除して実行可能) ---
/*
(async () => {
  // カレントディレクトリ (.) のファイル・フォルダを再帰的に取得し表示する
  console.log("Walking from '.'...");
  try {
    for await (const elem of walk(".")) {
      console.log(elem);
    }
    console.log("Walk complete.");
  } catch (e) {
    console.error("An error occurred during walk:", e);
  }
})();
*/
