export const abs = (n: number): number => {
  if (n >= 0) {
    return n;
  } else if (n < 0) {
    return n * -1;
  } else {
    return 0;
  }
};

export const sum = (a: number, b: number): number => {
  return a + b;
};

export const factorial = (n: number): number => {
  return n * n;
};
