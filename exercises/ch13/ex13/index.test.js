import { walk } from './index.js'; // ← これを追加
import { promises as fs } from 'fs'; // ← これを追加
import path from 'path';
import { fileURLToPath } from 'url'; // urlモジュールをインポート

// ESM環境で __dirname を定義する
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
describe('walk', () => {
  const tmpDir = path.join(__dirname, 'tmp_test_dir');
  const fileA = path.join(tmpDir, 'a.txt');
  const subDir = path.join(tmpDir, 'sub');
  const fileB = path.join(subDir, 'b.txt');

  beforeAll(async () => {
    await fs.mkdir(subDir, { recursive: true });
    await fs.writeFile(fileA, 'A');
    await fs.writeFile(fileB, 'B');
  });

  afterAll(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  test('再帰的にファイルとディレクトリをyieldする', async () => {
    const results = [];
    for await (const elem of walk(tmpDir)) {
      results.push(elem);
    }
    const paths = results.map((e) => path.basename(e.path));
    expect(paths).toEqual(expect.arrayContaining(['a.txt', 'sub', 'b.txt']));
    expect(results.find((e) => e.path === tmpDir).isDirectory).toBe(true);
    expect(results.find((e) => path.basename(e.path) === 'a.txt').isDirectory).toBe(false);
    expect(results.find((e) => path.basename(e.path) === 'sub').isDirectory).toBe(true);
    expect(results.find((e) => path.basename(e.path) === 'b.txt').isDirectory).toBe(false);
  });

  test('ファイルパスの場合はそのファイルのみyieldする', async () => {
    const results = [];
    for await (const elem of walk(fileA)) {
      results.push(elem);
    }
    expect(results).toEqual([{ path: fileA, isDirectory: false }]);
  });

  test('存在しないパスの場合は何も返さない', async () => {
    const results = [];
    for await (const elem of walk(path.join(tmpDir, 'nope'))) {
      results.push(elem);
    }
    expect(results).toEqual([]);
  });
});
