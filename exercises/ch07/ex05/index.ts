// 配列にはnumberしか入らないものとする。
// slice(0,-1)で最後の要素を取り除くpop、
export const pop = (arr: number[]): number[] => arr.slice(0, -1);

export const push = (arr: number[], num: number): number[] => [...arr, num];

export const shift = (arr: number[]): number[] => arr.slice(1);

export const unshift = (arr: number[], num: number): number[] => [num, ...arr];

export const sort = (arr: number[], compareFn?: (a: number, b: number) => number): number[] => {
  // 新しい配列にコピーしてからソート
  const sortedArr = [...arr];
  return sortedArr.sort(compareFn);
};

const seq = [1, 2, 3, 4, 5];

console.log(pop(seq)); // [1, 2, 3, 4]
console.log(push(seq, 6)); // [1, 2, 3, 4, 5, 6]
console.log(shift(seq)); // [2, 3, 4, 5]
console.log(unshift(seq, 0)); // [0, 1, 2, 3, 4, 5]
console.log(sort(seq, (a, b) => b - a)); // [5, 4, 3, 2, 1]

// 元の配列は変更されていません
console.log(seq); // [1, 2, 3, 4, 5]
