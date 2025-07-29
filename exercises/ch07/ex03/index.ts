export const sum = (array?: number[]): number => {
  if (!array) {
    return 0;
  }
  return array.reduce((acc, curr) => acc + curr, 0);
};

export const join = (array?: Array<string | number | null>, separator?: string | null): string => {
  if (!array) {
    throw new Error();
  }
  if (separator === undefined) {
    separator = ',';
  } else if (separator === null) {
    separator = 'null';
  }
  return array.join(separator);
};

export const reverse = (array?: Array<string | number>): Array<string | number> => {
  if (!array) {
    throw new Error();
  }
  return [...array].reverse();
};

export const every = <T>(
  array?: T[], //使う時に型を定義できる。好きな型をあとで指定できる。
  condition?: (value: T, index: number, array: T[]) => boolean,
): boolean => {
  if (!array || !condition) {
    throw new Error('Invalid arguments');
  }

  for (let i = 0; i < array.length; i++) {
    if (Object.prototype.hasOwnProperty.call(array, i)) {
      if (!condition(array[i], i, array)) {
        return false;
      }
    }
  }
  return true;
};

export const some = <T>(
  array?: T[],
  condition?: (value: T, index: number, array: T[]) => boolean,
): boolean => {
  if (!array || !condition) {
    return false;
  }
  for (let i = 0; i < array.length; i++) {
    if (i in array && condition(array[i], i, array)) {
      return true;
    }
  }
  return false;
};
