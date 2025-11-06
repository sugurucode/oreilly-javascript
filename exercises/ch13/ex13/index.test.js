import { walk } from './index.js';
import * as path from 'path';

describe('walk', () => {
  const dirName = path.join('exercises', 'ch13', 'ex13');

  it('ディレクトリとファイルを取得できる', async () => {
    const results = [];
    for await (const entry of walk(dirName)) {
      results.push(entry);
    }
    // 取得した path の一覧を表示（テスト用）
    const paths = results.map((e) => e.path);
    expect(paths).toContain(dirName); // 自分自身（ディレクトリ）が含まれる
    // ファイル（index.js, index.test.js）が含まれることを確認
    expect(paths).toContain(path.join(dirName, 'index.js'));
    expect(paths).toContain(path.join(dirName, 'index.test.js'));
    // ディレクトリであることの確認
    const dirEntry = results.find((e) => e.path === dirName);
    expect(dirEntry.isDirectory).toBe(true);
    // ファイルであることの確認
    const fileEntry = results.find((e) => e.path === path.join(dirName, 'index.js'));
    expect(fileEntry.isDirectory).toBe(false);
  });
});
