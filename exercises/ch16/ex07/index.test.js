import { checkEntry } from './index.js';

test(`ファイルが存在する場合は 'file' を返す`, async () => {
  const filePath = `exercises/ch16/ex07/index.test.js`;
  expect(await checkEntry(filePath)).toBe('file');
});

test(`ディレクトリが存在する場合は 'directory' を返す`, async () => {
  const dirPath = `exercises/ch16/ex07`;
  expect(await checkEntry(dirPath)).toBe('directory');
});

test(`存在しないパスの場合はエラーメッセージを返す`, async () => {
  const nonExistentPath = `exercises/ch16/ex07/nonexistent`;
  const result = await checkEntry(nonExistentPath);
  expect(result).toMatch(/エラーが発生しました/);
});
