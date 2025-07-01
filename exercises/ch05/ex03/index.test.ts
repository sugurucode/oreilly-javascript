import { is31DaysIfElse, is31DaysSwitch, Month } from './index.ts';

describe('is31DaysIfElse', () => {
  it('31日の月はtrueを返す', () => {
    const months: Month[] = ['Jan', 'Mar', 'May', 'Jul', 'Aug', 'Oct', 'Dec'];
    months.forEach((month) => {
      expect(is31DaysIfElse(month)).toBe(true);
    });
  });
  it('31日でない月はfalseを返す', () => {
    const months: Month[] = ['Feb', 'Apr', 'Jun', 'Sep', 'Nov'];
    months.forEach((month) => {
      expect(is31DaysIfElse(month)).toBe(false);
    });
  });
});

describe('is31DaysSwitch', () => {
  it('31日の月はtrueを返す', () => {
    const months: Month[] = ['Jan', 'Mar', 'May', 'Jul', 'Aug', 'Oct', 'Dec'];
    months.forEach((month) => {
      expect(is31DaysSwitch(month)).toBe(true);
    });
  });
  it('31日でない月はfalseを返す', () => {
    const months: Month[] = ['Feb', 'Apr', 'Jun', 'Sep', 'Nov'];
    months.forEach((month) => {
      expect(is31DaysSwitch(month)).toBe(false);
    });
  });
});
