import * as fs from 'node:fs/promises';
import * as path from 'node:path';

// コールバック関数を引数で渡す必要はなく、Promiseを返すので async/await で扱える
export async function fetchFirstFileSize(dirPath) {
  const files = await fs.readdir(dirPath);
  if (files.length === 0) {
    return null;
  }

  // 最初のファイルのパスを構築
  const firstFilePath = path.join(dirPath, files[0]);

  // ファイル情報取得
  const stats = await fs.stat(firstFilePath); //promisesのstatを使用

  //ファイルサイズを返す
  return stats.size;
}

export async function fetchSumOfFileSizes(dirPath) {
  // fs.readdir を await で呼び出す (コールバックが不要になる)
  // エラーが発生した場合、この関数が Promise.reject(err) を返す
  const files = await fs.readdir(dirPath); //[ 'file1.txt', 'file2.txt', ... ]

  let total = 0;
  const rest = [...files];

  async function iter() {
    // callback(null, total) の代わりに結果を return する
    if (rest.length === 0) {
      return total;
    }

    const next = rest.pop(); // [ 'file1.txt', 'file2.txt'] -> [ 'file1.txt' ]  next='file2.txt'

    // fs.stat を await で呼び出す (コールバックが不要になる)
    const stats = await fs.stat(path.join(dirPath, next));

    total += stats.size;

    // 次の iter() を await して呼び出し、その結果を return する
    // awaitが無いと、Promiseオブジェクトが返されてしまう
    return await iter(); // 最終的にここで total が return される
  }

  // 最初の iter() を呼び出し、最終的な合計値 (total) を return する
  return await iter();
}

// function fetchFirstFileSize(path, callback) {
//   fs.readdir(path, (err, files) => {
//     if (err) {
//       callback(err);
//       return;
//     }
//     if (files.length === 0) {
//       callback(null, null);
//       return;
//     }

//     fs.stat(join(path, files[0]), (err, stats) => {
//       if (err) {
//         callback(err);
//         return;
//       }
//       callback(null, stats.size);
//     });
//   });
// }

// // 元の関数は以下のように、pathとcallbackを渡して使用する
// // callbackはエラーと結果を受け取る関数
// fetchFirstFileSize('./exercises/ch13/ex04/directory', (err, size) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(size); // 最初のファイルのサイズを表示
// });
