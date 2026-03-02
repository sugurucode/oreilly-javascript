import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import fs from 'fs/promises';
import { checkEntry } from './index.js';

describe('checkEntry', () => {
  beforeEach(() => {
    // 実行環境の fs.lstat を jest の関数に置き換える
    fs.lstat = jest.fn();
  });

  describe('正常系: ファイルタイプの判定', () => {
    const cases = [
      ['isFile', 'file'],
      ['isDirectory', 'directory'],
      ['isSymbolicLink', 'symbolic link'],
      ['isSocket', 'socket'],
      ['isFIFO', 'fifo'],
      ['isCharacterDevice', 'character device'],
      ['isBlockDevice', 'block device'],
    ];

    test.each(cases)('%s のとき "%s" を返すこと', async (method, expected) => {
      const mockStats = {
        isFile: () => method === 'isFile',
        isDirectory: () => method === 'isDirectory',
        isSymbolicLink: () => method === 'isSymbolicLink',
        isSocket: () => method === 'isSocket',
        isFIFO: () => method === 'isFIFO',
        isCharacterDevice: () => method === 'isCharacterDevice',
        isBlockDevice: () => method === 'isBlockDevice',
      };

      fs.lstat.mockResolvedValue(mockStats);

      const result = await checkEntry('/dummy/path');
      expect(result).toBe(expected);
    });
  });

  describe('異常系: エラーハンドリング', () => {
    test('ファイルが存在しない（ENOENT）とき "not found" を返すこと', async () => {
      const error = new Error('no such file');
      error.code = 'ENOENT';
      fs.lstat.mockRejectedValue(error);

      const result = await checkEntry('/missing/path');
      expect(result).toBe('not found');
    });

    test('権限エラー（EACCES）のとき "permission denied" を返すこと', async () => {
      const error = new Error('permission denied');
      error.code = 'EACCES';
      fs.lstat.mockRejectedValue(error);

      const result = await checkEntry('/root/path');
      expect(result).toBe('permission denied');
    });
  });
});
