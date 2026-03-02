// index.js
import fs from 'fs/promises';
/**
 * 指定されたパスの状態を判定する
 * @param {string} pathString - 判定したいパス
 * @returns {Promise<string>} 'file', 'directory', 'not found', 'permission denied', または 'other'
 */

/**
 * 指定されたパスの状態を詳細に判定する
 * @param {string} pathString - 判定したいパス
 * @returns {Promise<string>} ファイルタイプ、またはエラー状況を表す文字列
 */
export async function checkEntry(pathString) {
  try {
    // シンボリックリンクそのものを判定するため、statではなくlstatを使用
    const stats = await fs.lstat(pathString);

    if (stats.isFile()) {
      return 'file';
    } else if (stats.isDirectory()) {
      return 'directory';
    } else if (stats.isSymbolicLink()) {
      return 'symbolic link'; // シンボリックリンク
    } else if (stats.isSocket()) {
      return 'socket'; // ソケット
    } else if (stats.isFIFO()) {
      return 'fifo'; // 名前付きパイプ
    } else if (stats.isCharacterDevice()) {
      return 'character device'; // キャラクターデバイス
    } else if (stats.isBlockDevice()) {
      return 'block device'; // ブロックデバイス
    } else {
      // それ以外のファイルタイプ（例: 不明なファイルタイプ）
      return '';
    }
  } catch (error) {
    // ENOENT: ファイルやディレクトリが存在しない
    if (error.code === 'ENOENT') {
      return 'not found';
      // EACCES: アクセス権限がない、EPERM: 操作が許可されていない
    } else if (error.code === 'EACCES' || error.code === 'EPERM') {
      return 'permission denied';
    } else {
      throw error;
    }
  }
}
