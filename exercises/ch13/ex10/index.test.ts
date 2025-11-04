import { jest } from '@jest/globals';
import { fetchSumOfFileSizes } from './index.ts';

// --- テスト用モック関数を先に定義 ---
const readdirMock = jest.fn();
const statMock = jest.fn();
const joinMock = jest.fn((...args: string[]) => args.join('/'));

// --- モジュールのモック ---
jest.mock('fs/promises', () => ({
  readdir: readdirMock,
  stat: statMock,
}));
jest.mock('path', () => ({
  join: joinMock,
}));

// Stats の簡易モック型
function createStats(size: number, isFile: boolean) {
  return {
    size,
    isFile: () => isFile,
    atime: new Date(),
    mtime: new Date(),
    ctime: new Date(),
    birthtime: new Date(),
    atimeMs: 0,
    mtimeMs: 0,
    ctimeMs: 0,
    birthtimeMs: 0,
    isDirectory: () => !isFile,
    isBlockDevice: () => false,
    isCharacterDevice: () => false,
    isSymbolicLink: () => false,
    isFIFO: () => false,
    isSocket: () => false,
  } as any;
}

describe('fetchSumOfFileSizes', () => {
  beforeEach(() => {
    readdirMock.mockClear();
    statMock.mockClear();
    joinMock.mockClear();
  });

  test('複数のファイルの合計サイズを正しく計算できる', async () => {
    readdirMock.mockResolvedValue(['file1.txt', 'file2.png', 'subdir']);
    statMock
      .mockResolvedValueOnce(createStats(100, true))
      .mockResolvedValueOnce(createStats(250, true))
      .mockResolvedValueOnce(createStats(4096, false));
    const totalSize = await fetchSumOfFileSizes('dummy/path');
    expect(totalSize).toBe(350);
    expect(joinMock).toHaveBeenCalledWith('dummy/path', 'file1.txt');
    expect(joinMock).toHaveBeenCalledWith('dummy/path', 'file2.png');
    expect(joinMock).toHaveBeenCalledWith('dummy/path', 'subdir');
  });

  test('ディレクトリが空の場合、0を返す', async () => {
    readdirMock.mockResolvedValue([]);
    const totalSize = await fetchSumOfFileSizes('empty/dir');
    expect(totalSize).toBe(0);
    expect(readdirMock).toHaveBeenCalledWith('empty/dir');
    expect(statMock).not.toHaveBeenCalled();
  });

  test('ディレクトリの読み取りに失敗した場合、0を返す', async () => {
    readdirMock.mockRejectedValue(new Error('Permission denied'));
    const totalSize = await fetchSumOfFileSizes('locked/dir');
    expect(totalSize).toBe(0);
  });

  test('一部のファイルのstat取得に失敗しても、他のファイルの合計を返す', async () => {
    readdirMock.mockResolvedValue(['fileA.txt', 'inaccessible.file', 'fileB.txt']);
    statMock
      .mockResolvedValueOnce(createStats(50, true))
      .mockRejectedValueOnce(new Error('Access denied'))
      .mockResolvedValueOnce(createStats(150, true));
    const totalSize = await fetchSumOfFileSizes('mixed/path');
    expect(totalSize).toBe(200);
  });
});
