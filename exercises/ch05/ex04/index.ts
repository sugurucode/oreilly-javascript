// while文によるフィボナッチ数列
export const fibonacciWhile = (): number[] => {
  const result: number[] = [1, 1];
  while (result.length < 10) {
    result.push(result[result.length - 1] + result[result.length - 2]);
  }
  return result;
};

// do/while文によるフィボナッチ数列
export const fibonacciDoWhile = (): number[] => {
  const result: number[] = [1, 1];
  do {
    result.push(result[result.length - 1] + result[result.length - 2]);
  } while (result.length < 10);
  return result;
};

// for文によるフィボナッチ数列
export const fibonacciFor = (): number[] => {
  const result: number[] = [1, 1];
  for (let i = 2; i < 10; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }
  return result;
};
