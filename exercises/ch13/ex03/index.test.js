import { readdirPromise, statPromise, readdirPromisify, statPromisify } from './index.js';
import * as fs from 'node:fs';

describe('Promiseベースのfs関数のテスト', () => {
  const testDir = './exercises/ch13/ex03/testdir';
  const testFile = './exercises/ch13/ex03/testdir/file.txt';

  beforeAll(() => {
    // テスト用ディレクトリがなければ作成し、テスト用ファイルを作成
    if (!fs.existsSync(testDir)) fs.mkdirSync(testDir);
    // テスト用ファイルを作成。内容は「こんにちは」
    fs.writeFileSync(testFile, 'こんにちは');
  });

  afterAll(() => {
    // テスト用ファイルとディレクトリを削除
    fs.unlinkSync(testFile);
    fs.rmdirSync(testDir);
  });

  test('readdirPromise: ディレクトリ内のファイル名配列が取得できる', async () => {
    const files = await readdirPromise(testDir);
    expect(files).toContain('file.txt');
  });

  test('statPromise: ファイル情報(fs.Stats)が取得できる', async () => {
    const stats = await statPromise(testFile);
    expect(stats.isFile()).toBe(true);
    expect(stats.size).toBe(15); // "こんにちは"はUTF-8で15バイト
  });

  test('readdirPromisify: ディレクトリ内のファイル名配列が取得できる', async () => {
    const files = await readdirPromisify(testDir);
    expect(files).toContain('file.txt');
  });

  test('statPromisify: ファイル情報(fs.Stats)が取得できる', async () => {
    const stats = await statPromisify(testFile);
    expect(stats.isFile()).toBe(true);
    expect(stats.size).toBe(15);
  });

  test('readdirPromise: 存在しないディレクトリでエラーになる', async () => {
    await expect(readdirPromise('notfound')).rejects.toThrow();
  });

  test('statPromise: 存在しないファイルでエラーになる', async () => {
    await expect(statPromise('notfound.txt')).rejects.toThrow();
  });
});
