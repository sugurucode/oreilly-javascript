export const sum = (array?: number[]): number => {
  if (!array) return 0;
  return array.reduce((acc, curr) => acc + curr, 0);
};

export const join = (array?: Array<string | number | null>, separator?: string | null): string => {
  if (!array) throw new Error();
  if (separator === undefined) separator = ',';
  else if (separator === null) separator = 'null';
  return array.reduce((acc, curr, i) => acc + (i === 0 ? '' : separator) + String(curr), '');
};

export const reverse = (array?: Array<string | number>): Array<string | number> => {
  if (!array) throw new Error();
  return array.reduce<Array<string | number>>((acc, curr) => [curr, ...acc], []);
};

export const every = <T>(
  array?: T[],
  condition?: (value: T, index: number, array: T[]) => boolean,
): boolean => {
  if (!array || !condition) throw new Error('Invalid arguments');
  return array.reduce((acc, curr, i, arr) => acc && condition(curr, i, arr), true);
};

export const some = <T>(
  array?: T[],
  condition?: (value: T, index: number, array: T[]) => boolean,
): boolean => {
  if (!array || !condition) return false;
  return array.reduce((acc, curr, i, arr) => acc || condition(curr, i, arr), false);
};
