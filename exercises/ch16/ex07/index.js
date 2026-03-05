import fs from 'fs/promises';

/**
 * fs.stat を利用して実体のタイプを判定する
 */
export async function checkEntry(pathString) {
  try {
    // statはシンボリックリンクを自動で解決（リンク先を参照）する
    const stats = await fs.stat(pathString);
    console.log(stats);

    // stats.isFileはstatsのmode（16877）などの数値をビット演算して判定している。
    if (stats.isFile()) {
      return 'file';
    } else if (stats.isDirectory()) {
      return 'directory';
    } else {
      // リンク先が特殊ファイル（ソケットやデバイス等）の場合
      // 例えばstats.isSocket()やstats.isCharacterDevice()などがある。
      return 'ファイルでもディレクトリでもありません。';
    }
  } catch (error) {
    return 'エラーが発生しました: ' + error.message;
  }
}

// const obj = await checkEntry(`exercises/ch16/ex07/test`);
// console.log(obj); // directory
