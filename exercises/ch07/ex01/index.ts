/**
 * 行列の加算を行う関数
 * @param matrix1 1つ目の行列
 * @param matrix2 2つ目の行列
 * @returns 加算結果の行列
 */
export const addMatrix = (matrix1: number[][], matrix2: number[][]): number[][] => {
  // 行列のサイズチェック
  if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
    throw new Error('行列のサイズが一致していません');
  }

  const rows = matrix1.length;
  const cols = matrix1[0].length;
  const result: number[][] = [];

  for (let i = 0; i < rows; i++) {
    result[i] = [];
    for (let j = 0; j < cols; j++) {
      result[i][j] = matrix1[i][j] + matrix2[i][j];
    }
  }

  return result;
};

/**
 * 行列の乗算を行う関数
 * @param matrix1 1つ目の行列
 * @param matrix2 2つ目の行列
 * @returns 乗算結果の行列
 */
export const multiplyMatrix = (matrix1: number[][], matrix2: number[][]): number[][] => {
  // 行列の乗算可能性チェック
  if (matrix1[0].length !== matrix2.length) {
    throw new Error('1つ目の行列の列数と2つ目の行列の行数が一致していません');
  }

  const rows1 = matrix1.length;
  const cols2 = matrix2[0].length;
  const result: number[][] = [];

  for (let i = 0; i < rows1; i++) {
    result[i] = [];
    for (let j = 0; j < cols2; j++) {
      result[i][j] = 0;
      for (let k = 0; k < matrix2.length; k++) {
        result[i][j] += matrix1[i][k] * matrix2[k][j];
      }
    }
  }

  return result;
};
