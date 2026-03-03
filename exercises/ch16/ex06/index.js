import fs from 'fs/promises';

async function main() {
  // binはバイナリの略。任意のバイト列を扱うファイルであることを示すための慣習的な拡張子。
  const filePath = './test.bin';

  // 空のファイルを作成
  await fs.writeFile(filePath, '');

  // 2. 10バイトに拡張（truncate）
  await fs.truncate(filePath, 10);

  console.log('ファイルの拡張が完了しました。');
}

main();
