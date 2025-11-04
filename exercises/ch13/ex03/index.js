import * as fs from 'node:fs';
import { promisify } from 'node:util';

/**
 * fs.readdir の Promise 版
 * @param {fs.PathLike} path
 * @param {fs.ObjectEncodingOptions | BufferEncoding | null} [options]
 * @returns {Promise<string[] | Buffer[]>}
 */
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
// readdirPromise('./some_directory')
//   .then(files => console.log(files))
//   .catch(err => console.error(err));

/**
 * fs.stat の Promise 版
 * @param {fs.PathLike} path
 * @param {fs.StatOptions} [options]
 * @returns {Promise<fs.Stats>}
 */
export function statPromise(path, options) {
  return new Promise((resolve, reject) => {
    // options が省略された場合に備えて調整可能
    const statCallback = (err, stats) => {
      if (err) {
        // エラーがあれば reject で失敗を通知
        reject(err);
        return;
      }
      // 成功し、結果 (stats) があれば resolve で結果を返す
      resolve(stats);
    };

    // options が指定されているかどうかで呼び出しを分ける
    if (options) {
      fs.stat(path, options, statCallback);
    } else {
      fs.stat(path, statCallback);
    }
  });
}

// 使用例
// statPromise('./some_file')
//   .then(stats => console.log('Is File:', stats.isFile()))
//   .catch(err => console.error(err));

// fs.readdir の Promise 版
export const readdirPromisify = promisify(fs.readdir);

// fs.stat の Promise 版
export const statPromisify = promisify(fs.stat);

// 使用例
// readdirPromisify('./some_directory')
//   .then(files => console.log(files))
//   .catch(err => console.error(err));

// statPromisify('./some_file')
//   .then(stats => console.log('Is Directory:', stats.isDirectory()))
//   .catch(err => console.error(err));
