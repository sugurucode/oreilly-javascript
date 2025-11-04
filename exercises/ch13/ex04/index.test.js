import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { fetchFirstFileSize, fetchSumOfFileSizes } from './index.js';

// __dirname の代替: ESM環境対応
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// テスト用のパス定義
const TEST_DIR_BASE = path.join(__dirname, 'fs_promise_test');
const TEST_DIR = path.join(TEST_DIR_BASE, 'test_dir');
const EMPTY_DIR = path.join(TEST_DIR_BASE, 'empty_dir');
const FILE_1 = path.join(TEST_DIR, 'file1.txt');
const FILE_2 = path.join(TEST_DIR, 'file2.log');

/**
 * セットアップ関数: テスト用のディレクトリとファイルを作成
 */
async function setup() {
  await fs.mkdir(TEST_DIR, { recursive: true });
  await fs.mkdir(EMPTY_DIR, { recursive: true });

  // ファイル1 (10バイト)
  await fs.writeFile(FILE_1, '0123456789');
  // ファイル2 (5バイト)
  await fs.writeFile(FILE_2, 'Hello');
}

/**
 * ティアダウン関数: テスト用のディレクトリとファイルを削除
 */
async function teardown() {
  await fs.rm(TEST_DIR_BASE, { recursive: true, force: true });
}

describe('node:fs/promises rewrite tests', () => {
  // 各テストスイートの開始前に実行
  beforeAll(setup);

  // 各テストスイートの終了後に実行
  afterAll(teardown);

  // --- fetchFirstFileSize のテスト ---
  describe('fetchFirstFileSize', () => {
    test('ディレクトリ内の最初のファイルのサイズを正しく返す', async () => {
      // fs.readdir の結果は保証されないが、ここでは file1.txt のサイズが返ると期待する
      // (より厳密には、返り値が 10 または 5 のどちらかであることを確認する)
      const size = await fetchFirstFileSize(TEST_DIR);

      // readdir の結果順序は OS 依存だが、テストの安定性のためにどちらかであるかを確認
      const expectedSizes = [10, 5]; // file1.txt (10) と file2.log (5)
      expect(expectedSizes).toContain(size);
    });

    test('空のディレクトリの場合は null を返す', async () => {
      await expect(fetchFirstFileSize(EMPTY_DIR)).resolves.toBe(null);
    });

    test('存在しないパスでエラーをスローする', async () => {
      const nonExistentPath = path.join(TEST_DIR_BASE, 'non_existent');
      await expect(fetchFirstFileSize(nonExistentPath)).rejects.toThrow();
    });
  });

  // --- fetchSumOfFileSizes のテスト ---
  describe('fetchSumOfFileSizes', () => {
    test('ディレクトリ内の合計ファイルサイズを正しく返す', async () => {
      // 10バイト + 5バイト = 15バイト
      await expect(fetchSumOfFileSizes(TEST_DIR)).resolves.toBe(15);
    });

    test('空のディレクトリの場合は 0 を返す', async () => {
      // readdir の結果が空配列 [] になり、reduce の初期値 0 が返る
      await expect(fetchSumOfFileSizes(EMPTY_DIR)).resolves.toBe(0);
    });

    test('存在しないパスでエラーをスローする', async () => {
      const nonExistentPath = path.join(TEST_DIR_BASE, 'non_existent');
      await expect(fetchSumOfFileSizes(nonExistentPath)).rejects.toThrow();
    });
  });
});
