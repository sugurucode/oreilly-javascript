import { getDaysInMonth, countWeekdays, getWeekdayName, getFirstDayOfLastMonth } from './index';

describe('getDaysInMonth', () => {
  test('1月は31日', () => {
    expect(getDaysInMonth(1)).toBe(31);
  });
  test('2月は28日', () => {
    expect(getDaysInMonth(2)).toBe(28);
  });
  test('4月は30日', () => {
    expect(getDaysInMonth(4)).toBe(30);
  });
});

describe('countWeekdays', () => {
  test('2025-09-01から2025-09-07の平日数', () => {
    expect(countWeekdays('2025-09-01', '2025-09-07')).toBe(5);
  });
  test('土日を含む期間の平日数', () => {
    expect(countWeekdays('2025-09-02', '2025-09-10')).toBe(7);
  });
});

describe('getWeekdayName', () => {
  test('2025-09-30の曜日名（ja-JP）', () => {
    expect(getWeekdayName('2025-09-30', 'ja-JP')).toMatch(/日曜日|日/);
  });
  test('2025-09-30の曜日名（en-US）', () => {
    expect(getWeekdayName('2025-09-30', 'en-US')).toBe('Tuesday');
  });
});

describe('getFirstDayOfLastMonth', () => {
  test('先月1日のDateオブジェクト', () => {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0);
    const result = getFirstDayOfLastMonth();
    expect(result.getFullYear()).toBe(lastMonth.getFullYear());
    expect(result.getMonth()).toBe(lastMonth.getMonth());
    expect(result.getDate()).toBe(1);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
  });
});
