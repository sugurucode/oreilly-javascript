import * as fs from 'fs';
import * as path from 'path';
import { readLines } from './index.ts';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// テスト用のファイルパスを定義
const TEST_DIR = path.join(__dirname, 'test_files');
const FILE_NORMAL = path.join(TEST_DIR, 'normal.txt');
const FILE_EMPTY = path.join(TEST_DIR, 'empty.txt');
const FILE_NO_NEWLINE = path.join(TEST_DIR, 'no_newline.txt');
const FILE_NONEXISTENT = path.join(TEST_DIR, 'nonexistent.txt');
const FILE_LARGE = path.join(TEST_DIR, 'large.txt');

// --- テストスイート ---
describe('readLines (ファイル行読み込みジェネレータ)', () => {
  /**
   * すべてのテストの前に、テスト用のディレクトリとファイルを作成
   */
  beforeAll(() => {
    // テストディレクトリ作成
    if (!fs.existsSync(TEST_DIR)) {
      fs.mkdirSync(TEST_DIR);
    }

    // 1. 標準的なファイル (3行)
    fs.writeFileSync(FILE_NORMAL, 'Line 1\nLine 2\nLine 3');

    // 2. 空ファイル
    fs.writeFileSync(FILE_EMPTY, '');

    // 3. 最終行に改行がないファイル
    fs.writeFileSync(FILE_NO_NEWLINE, 'One line only');

    // 4. バッファサイズ(64KB)を超える大きなファイル
    // (Line X... (約10B) * 10,000行 = 約100KB)
    let largeContent = '';
    for (let i = 1; i <= 10000; i++) {
      largeContent += `This is line number ${i}\n`;
    }
    fs.writeFileSync(FILE_LARGE, largeContent);
  });

  /**
   * すべてのテストの後に、テストファイルをクリーンアップ
   */
  afterAll(() => {
    fs.unlinkSync(FILE_NORMAL);
    fs.unlinkSync(FILE_EMPTY);
    fs.unlinkSync(FILE_NO_NEWLINE);
    fs.unlinkSync(FILE_LARGE);
    fs.rmdirSync(TEST_DIR);
  });

  // --- テストケース ---

  test('標準的なファイルを正しく読み込めること (3行)', () => {
    // スプレッド構文(...)でジェネレータの結果をすべて配列に展開
    const lines = [...readLines(FILE_NORMAL)];
    expect(lines).toEqual(['Line 1', 'Line 2', 'Line 3']);
  });

  test('空のファイルを読み込んだ場合、何も返さないこと', () => {
    const lines = [...readLines(FILE_EMPTY)];
    expect(lines).toEqual([]);
  });

  test('最終行に改行がないファイルを正しく読み込めること', () => {
    const lines = [...readLines(FILE_NO_NEWLINE)];
    expect(lines).toEqual(['One line only']);
  });

  test('バッファサイズ(64KB)を超える大きなファイルを正しく読み込めること (10000行)', () => {
    const lines = [...readLines(FILE_LARGE)];
    // すべての行が読み込めたか（数）
    expect(lines.length).toBe(10000);
    // 最初と最後の行が正しいか
    expect(lines[0]).toBe('This is line number 1');
    expect(lines[9999]).toBe('This is line number 10000');
  });

  test('存在しないファイルを読み込もうとした場合、エラーがスローされること', () => {
    // ジェネレータは実行時(..するとき)にエラーを出すため、
    // expect(() => ... ) で実行する関数全体を囲む
    const readNonExistent = () => {
      // スプレッド構文でイテレータを強制的に実行
      [...readLines(FILE_NONEXISTENT)];
    };

    // ENOENT (No such file or directory) エラーを期待
    expect(readNonExistent).toThrow('ENOENT');
  });
});
