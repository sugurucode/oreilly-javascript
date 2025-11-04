// exercises/ch13/ex08/index.test.js

import { rm, mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { fetchFirstFileSize, fetchSumOfFileSizes } from './index.js';

// --- テスト設定 ---
const TEST_DIR = 'test-tmp-ch13-ex08';
const EMPTY_DIR = resolve(TEST_DIR, 'empty');
const FILE1_PATH = resolve(TEST_DIR, 'file1.txt');
const FILE2_PATH = resolve(TEST_DIR, 'file2.txt');
const SUB_DIR = resolve(TEST_DIR, 'subdir'); // サブディレクトリも考慮

const FILE1_CONTENT = 'hello';
const FILE2_CONTENT = 'world';
const FILE1_SIZE = Buffer.byteLength(FILE1_CONTENT); // 5
const FILE2_SIZE = Buffer.byteLength(FILE2_CONTENT); // 5

// --- 修正点：beforeAll と afterAll をトップレベルに配置 ---

beforeAll(async () => {
  // 1. 既存のディレクトリがあれば削除（安全のため）
  await rm(TEST_DIR, { recursive: true, force: true });

  // 2. テスト用ディレクトリとファイルを作成
  await mkdir(TEST_DIR);
  await mkdir(EMPTY_DIR);
  await mkdir(SUB_DIR); // ファイルサイズ計算で無視されるべきサブディレクトリ
  await writeFile(FILE1_PATH, FILE1_CONTENT);
  await writeFile(FILE2_PATH, FILE2_CONTENT);
});

afterAll(async () => {
  // 3. テスト完了後、ディレクトリ全体を削除
  await rm(TEST_DIR, { recursive: true, force: true });
});

// --- テストスイート ---

describe('fetchFirstFileSize', () => {
  test('最初のファイルサイズを返す', async () => {
    // readdir の結果は保証されないが、ここでは file1 が最初と仮定
    // (index.js の実装が stat で isFile() をチェックしていれば順不同でもOK)
    const size = await fetchFirstFileSize(TEST_DIR);
    expect(size).toBe(FILE1_SIZE); // 5
  });

  test('空ディレクトリは null', async () => {
    const size = await fetchFirstFileSize(EMPTY_DIR);
    expect(size).toBe(null);
  });

  test('ファイルが無くサブディレクトリのみの場合 null', async () => {
    const size = await fetchFirstFileSize(SUB_DIR);
    expect(size).toBe(null);
  });

  test('存在しないディレクトリはエラー', async () => {
    // console.error が出力されるが、テストはエラーを期待して成功する
    await expect(fetchFirstFileSize('./not-exist-dir')).rejects.toThrow('ENOENT');
  });
});

describe('fetchSumOfFileSizes', () => {
  test('全ファイルの合計サイズを返す', async () => {
    const total = await fetchSumOfFileSizes(TEST_DIR);
    // 5 (file1) + 5 (file2) = 10
    // SUB_DIR は無視されることを期待
    expect(total).toBe(FILE1_SIZE + FILE2_SIZE); // 10
  });

  test('空ディレクトリは0', async () => {
    const total = await fetchSumOfFileSizes(EMPTY_DIR);
    expect(total).toBe(0);
  });

  test('ファイルが無くサブディレクトリのみの場合 0', async () => {
    const total = await fetchSumOfFileSizes(SUB_DIR);
    expect(total).toBe(0);
  });

  test('存在しないディレクトリはエラー', async () => {
    // console.error が出力されるが、テストはエラーを期待して成功する
    await expect(fetchSumOfFileSizes('./not-exist-dir')).rejects.toThrow('ENOENT');
  });
});
