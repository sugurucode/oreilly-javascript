import { addMatrix, multiplyMatrix } from './index.ts';

describe('行列演算', () => {
  describe('addMatrix - 行列の加算', () => {
    test('2x2の行列を正しく加算できること', () => {
      const matrix1 = [
        [1, 2],
        [3, 4],
      ];
      const matrix2 = [
        [5, 6],
        [7, 8],
      ];
      const expected = [
        [6, 8],
        [10, 12],
      ];
      expect(addMatrix(matrix1, matrix2)).toEqual(expected);
    });

    test('3x3の行列を正しく加算できること', () => {
      const matrix1 = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      const matrix2 = [
        [9, 8, 7],
        [6, 5, 4],
        [3, 2, 1],
      ];
      const expected = [
        [10, 10, 10],
        [10, 10, 10],
        [10, 10, 10],
      ];
      expect(addMatrix(matrix1, matrix2)).toEqual(expected);
    });

    test('異なるサイズの行列で例外がスローされること', () => {
      const matrix1 = [
        [1, 2],
        [3, 4],
      ];
      const matrix2 = [
        [1, 2, 3],
        [4, 5, 6],
      ];
      expect(() => addMatrix(matrix1, matrix2)).toThrow('行列のサイズが一致していません');
    });
  });

  describe('multiplyMatrix - 行列の乗算', () => {
    test('2x2の行列を正しく乗算できること', () => {
      const matrix1 = [
        [1, 2],
        [3, 4],
      ];
      const matrix2 = [
        [5, 6],
        [7, 8],
      ];
      const expected = [
        [19, 22],
        [43, 50],
      ];
      expect(multiplyMatrix(matrix1, matrix2)).toEqual(expected);
    });

    test('2x3と3x2の行列を正しく乗算できること', () => {
      const matrix1 = [
        [1, 2, 3],
        [4, 5, 6],
      ];
      const matrix2 = [
        [7, 8],
        [9, 10],
        [11, 12],
      ];
      const expected = [
        [58, 64],
        [139, 154],
      ];
      expect(multiplyMatrix(matrix1, matrix2)).toEqual(expected);
    });

    test('互換性のない行列で例外がスローされること', () => {
      const matrix1 = [
        [1, 2],
        [3, 4],
      ];
      const matrix2 = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      expect(() => multiplyMatrix(matrix1, matrix2)).toThrow(
        '1つ目の行列の列数と2つ目の行列の行数が一致していません',
      );
    });
  });
});
