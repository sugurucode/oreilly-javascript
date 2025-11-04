import * as fs from 'fs';
import * as path from 'path';

// --- ESM環境で __dirname を再現 ---
import { fileURLToPath } from 'url';
import { walk } from './index.ts';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ---

// --- テスト用のディレクトリ/パス定義 ---
const TEST_ROOT = path.join(__dirname, 'test_dir_for_walk');
const SUB_DIR = path.join(TEST_ROOT, 'subdir');
const NESTED_DIR = path.join(SUB_DIR, 'nested');
const EMPTY_DIR = path.join(TEST_ROOT, 'empty');
const FILE_1 = path.join(TEST_ROOT, 'file1.txt');
const FILE_2 = path.join(SUB_DIR, 'file2.js');
const FILE_3 = path.join(NESTED_DIR, 'file3.json');
const FILE_HIDDEN = path.join(TEST_ROOT, '.hidden');

const NON_EXISTENT_PATH = path.join(TEST_ROOT, 'nonexistent');

// --- テストスイート ---
describe('walk (ディレクトリ再帰探索ジェネレータ)', () => {
  /**
   * すべてのテストの前に、テスト用のディレクトリ構造を構築
   */
  beforeAll(() => {
    // 既存なら削除して作り直す
    if (fs.existsSync(TEST_ROOT)) {
      fs.rmSync(TEST_ROOT, { recursive: true, force: true });
    }

    // ディレクトリ作成
    fs.mkdirSync(TEST_ROOT);
    fs.mkdirSync(SUB_DIR);
    fs.mkdirSync(NESTED_DIR);
    fs.mkdirSync(EMPTY_DIR);

    // ファイル作成
    fs.writeFileSync(FILE_1, 'file1');
    fs.writeFileSync(FILE_2, 'file2');
    fs.writeFileSync(FILE_3, 'file3');
    fs.writeFileSync(FILE_HIDDEN, 'hidden');
  });

  /**
   * すべてのテストの後に、ディレクトリ構造をクリーンアップ
   */
  afterAll(() => {
    if (fs.existsSync(TEST_ROOT)) {
      fs.rmSync(TEST_ROOT, { recursive: true, force: true });
    }
  });

  test('すべてのファイルとディレクトリを再帰的に検出すること', () => {
    // スプレッド構文(...)でジェネレータの結果をすべて配列に展開
    const results = [...walk(TEST_ROOT)];

    // 検出されるべきアイテムのリスト
    const expected = [
      { path: TEST_ROOT, isDirectory: true },
      { path: FILE_HIDDEN, isDirectory: false },
      { path: EMPTY_DIR, isDirectory: true },
      { path: FILE_1, isDirectory: false },
      { path: SUB_DIR, isDirectory: true },
      { path: FILE_2, isDirectory: false },
      { path: NESTED_DIR, isDirectory: true },
      { path: FILE_3, isDirectory: false },
    ];

    // 含まれるアイテムを比較
    expect(results).toHaveLength(expected.length);
    expect(results).toEqual(expect.arrayContaining(expected));
  });

  test('単一のファイルパスを指定した場合、そのファイルのみを返すこと', () => {
    const results = [...walk(FILE_1)];
    expect(results).toEqual([{ path: FILE_1, isDirectory: false }]);
  });

  test('空のディレクトリを指定した場合、そのディレクトリのみを返すこと', () => {
    const results = [...walk(EMPTY_DIR)];
    expect(results).toEqual([{ path: EMPTY_DIR, isDirectory: true }]);
  });

  test('存在しないパスを指定した場合、何も返さないこと', () => {
    const results = [...walk(NON_EXISTENT_PATH)];
    expect(results).toEqual([]);
  });
});
