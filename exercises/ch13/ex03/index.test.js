import path from 'path';
import { fileURLToPath } from 'url';
import { readdirPromise, readdirPromisify, statPromise, statPromisify } from './index.js';
import * as fs from 'node:fs';

// ESM環境で__dirnameを再現
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// テスト用のパス定義
const TEST_DIR = path.join(__dirname, 'test_dir_for_promise');
const TEST_FILE = path.join(TEST_DIR, 'test_file.txt');

// fs/promises APIを使用してセットアップ・ティアダウンを簡潔に行う
const { mkdir: fsMkdir, writeFile: fsWriteFile, rm: fsRm } = fs.promises;

/**
 * セットアップ関数: テスト用のディレクトリとファイルを作成
 */
async function setup() {
  await fsMkdir(TEST_DIR, { recursive: true });
  await fsWriteFile(TEST_FILE, 'Hello, Jest!');
}

/**
 * ティアダウン関数: テスト用のディレクトリとファイルを削除
 */
async function teardown() {
  // `recursive: true, force: true` でディレクトリと内容を強制削除
  await fsRm(TEST_DIR, { recursive: true, force: true });
}

describe('FS Promise Wrapper Tests', () => {
  // 各テストスイートの開始前に実行
  beforeAll(setup);

  // 各テストスイートの終了後に実行
  afterAll(teardown);

  // --- fs.readdir のテスト (Promise コンストラクタ) ---
  describe('readdirPromise', () => {
    test('ディレクトリの内容を正しく読み取る', async () => {
      const files = await readdirPromise(TEST_DIR, undefined);
      console.log('readdirPromise result:', files);
      // 'test_file.txt' が含まれていることを確認
      expect(Array.isArray(files)).toBe(true);
      expect(files).toContain('test_file.txt');
      expect(files.length).toBe(1);
    });

    test('存在しないパスでエラーを reject する', async () => {
      // 存在しないディレクトリパス
      const nonExistentPath = path.join(TEST_DIR, 'non_existent');
      // Promise が reject されることを確認
      await expect(readdirPromise(nonExistentPath)).rejects.toThrow();
      await expect(readdirPromise(nonExistentPath)).rejects.toHaveProperty('code', 'ENOENT');
    });
  });

  // --- fs.readdir のテスト (promisify) ---
  describe('readdirPromisify', () => {
    test('promisify版がディレクトリの内容を正しく読み取る', async () => {
      const files = await readdirPromisify(TEST_DIR);
      expect(files).toContain('test_file.txt');
    });
  });

  // --- fs.stat のテスト (Promise コンストラクタ) ---
  describe('statPromise', () => {
    test('ファイルの統計情報を正しく取得する', async () => {
      const stats = await statPromise(TEST_FILE);
      // 取得されたオブジェクトが fs.Stats のインスタンスであることを確認
      expect(stats).toBeInstanceOf(fs.Stats);
      // 統計情報がファイルであることを確認
      expect(stats.isFile()).toBe(true);
      // 統計情報がディレクトリではないことを確認
      expect(stats.isDirectory()).toBe(false);
    });

    test('存在しないファイルでエラーを reject する', async () => {
      // 存在しないファイルパス
      const nonExistentFile = path.join(TEST_DIR, 'non_existent_file.log');
      // Promise が reject されることを確認
      await expect(statPromise(nonExistentFile)).rejects.toThrow();
      await expect(statPromise(nonExistentFile)).rejects.toHaveProperty('code', 'ENOENT');
    });
  });

  // --- fs.stat のテスト (promisify) ---
  describe('statPromisify', () => {
    test('promisify版がファイルの統計情報を正しく取得する', async () => {
      const stats = await statPromisify(TEST_FILE);
      expect(stats).toBeInstanceOf(fs.Stats);
      expect(stats.isFile()).toBe(true);
    });
  });
});
