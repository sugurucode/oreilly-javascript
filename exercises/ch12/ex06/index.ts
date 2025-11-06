import * as fs from 'fs';
import * as path from 'path';

// 指定されたパス以下のファイルとディレクトリを再帰的に表示するジェネレータ関数
export function* walk(rootPath) {
  let stats;
  try {
    // lstatSyncを使い、シンボリックリンク(ショートカット)をたどらない
    stats = fs.lstatSync(rootPath);
  } catch (e) {
    // 存在しないパスや権限エラーの場合は何もしない
    console.error(`Error stating path ${rootPath}: ${e.message}`);
    return;
  }

  // 1. ディレクトリの場合
  if (stats.isDirectory()) {
    // まず自分自身（ディレクトリ）を yield する
    yield { path: rootPath, isDirectory: true };

    // 呼び出し元がforなどの場合２回目以降はここから再開
    let entries;
    try {
      // readDirSyncでディレクトリ内のエントリ名一覧を取得
      entries = fs.readdirSync(rootPath);
    } catch (e) {
      // ディレクトリが読み取れない場合は何もしない
      console.error(`Error reading directory ${rootPath}: ${e.message}`);
      return;
    }

    // 各エントリに対して再帰的に walk を呼び出す
    for (const entry of entries) {
      const fullPath = path.join(rootPath, entry);
      // yield* を使って、再帰呼び出し先のジェネレータが返す値を
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
