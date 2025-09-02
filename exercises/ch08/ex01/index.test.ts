import { stringDisplay, square, getCurrentTime } from './index.ts';

describe('stringDisplay', () => {
  test('指定した回数だけ文字をコンソール出力し、その文字が入った配列を返す', () => {
    const n = 3;
    const c = 'a';
    // console.logが実際に出力されないようにしつつ、呼び出しを監視
    // jest.spyOn(監視したいオブジェクト,そのオブジェクトのメソッド名)
    const consoleLogSpy = jest.spyOn(console, 'log');
    const result = stringDisplay(n, c);
    // console.logがn階呼ばれたか
    expect(consoleLogSpy).toHaveBeenCalledTimes(n);
    // 引数cを含んで一回以上呼ばれたか。
    expect(consoleLogSpy).toHaveBeenCalledWith(c);
    expect(result).toEqual(Array(n).fill(c));
  });
});

describe('square', () => {
  test('数値の二乗を返す', () => {
    expect(square(0)).toBe(0);
    expect(square(2)).toBe(4);
    expect(square(-3)).toBe(9);
  });
});

describe('getCurrentTime', () => {
  test('nowプロパティにDateオブジェクトが入っている', () => {
    const result = getCurrentTime();
    expect(result.now).toBeInstanceOf(Date);
  });
});
