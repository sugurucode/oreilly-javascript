import { fetchFirstFileSize, fetchSumOfFileSizes } from './index';
import * as path from 'node:path';
import * as fs from 'node:fs';

const dirname = './exercises/ch13/ex08';

// 13.4とまったく同じコード
describe('fetchFirstFileSize', () => {
  beforeAll(() => {
    // テスト用ディレクトリとファイルをセットアップ
    const dirPath = path.join(dirname, 'directory');
    const emptyDirPath = path.join(dirname, 'emptydir');

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
      fs.writeFileSync(path.join(dirPath, 'file1.txt'), 'Hello World');
      fs.writeFileSync(path.join(dirPath, 'file2.txt'), 'こんにちは');
    }

    if (!fs.existsSync(emptyDirPath)) {
      fs.mkdirSync(emptyDirPath);
    }
  });

  afterAll(() => {
    // テスト用ディレクトリとファイルをクリーンアップ
    const dirPath = path.join(dirname, 'directory');
    const emptyDirPath = path.join(dirname, 'emptydir');

    if (fs.existsSync(path.join(dirPath, 'file1.txt'))) {
      fs.unlinkSync(path.join(dirPath, 'file1.txt'));
    }
    if (fs.existsSync(path.join(dirPath, 'file2.txt'))) {
      fs.unlinkSync(path.join(dirPath, 'file2.txt'));
    }
    if (fs.existsSync(dirPath)) {
      fs.rmdirSync(dirPath);
    }
    if (fs.existsSync(emptyDirPath)) {
      fs.rmdirSync(emptyDirPath);
    }
  });

  it('最初のファイルサイズを取得できる', async () => {
    const dirPath = path.join(dirname, 'directory'); // テスト用ディレクトリ
    const size = await fetchFirstFileSize(dirPath);
    expect(typeof size).toBe('number');
    expect(size).toBeGreaterThan(0);
  });

  it('空ディレクトリなら null を返す', async () => {
    const dirPath = path.join(dirname, 'emptydir'); // 空ディレクトリ
    const size = await fetchFirstFileSize(dirPath);
    expect(size).toBeNull();
  });
});

describe('fetchSumOfFileSizes', () => {
  beforeAll(() => {
    // テスト用ディレクトリとファイルをセットアップ
    const dirPath = path.join(dirname, 'directory');
    const emptyDirPath = path.join(dirname, 'emptydir');

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
      fs.writeFileSync(path.join(dirPath, 'file1.txt'), 'Hello World');
      fs.writeFileSync(path.join(dirPath, 'file2.txt'), 'こんにちは');
    }

    if (!fs.existsSync(emptyDirPath)) {
      fs.mkdirSync(emptyDirPath);
    }
  });

  afterAll(() => {
    // テスト用ディレクトリとファイルをクリーンアップ
    const dirPath = path.join(dirname, 'directory');
    const emptyDirPath = path.join(dirname, 'emptydir');

    if (fs.existsSync(path.join(dirPath, 'file1.txt'))) {
      fs.unlinkSync(path.join(dirPath, 'file1.txt'));
    }
    if (fs.existsSync(path.join(dirPath, 'file2.txt'))) {
      fs.unlinkSync(path.join(dirPath, 'file2.txt'));
    }
    if (fs.existsSync(dirPath)) {
      fs.rmdirSync(dirPath);
    }
    if (fs.existsSync(emptyDirPath)) {
      fs.rmdirSync(emptyDirPath);
    }
  });

  it('ディレクトリ内ファイルサイズ合計を取得できる', async () => {
    const dirPath = path.join(dirname, 'directory');
    const sum = await fetchSumOfFileSizes(dirPath); //awaitが必要なのはpromiseを返すから
    expect(typeof sum).toBe('number');
    expect(sum).toBeGreaterThan(0);
  });

  it('空ディレクトリなら合計0を返す', async () => {
    const dirPath = path.join(dirname, 'emptydir');
    const sum = await fetchSumOfFileSizes(dirPath);
    expect(sum).toBe(0);
  });
});
