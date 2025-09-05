// 月の型エイリアス定義
export type Month =
  | 'Jan'
  | 'Feb'
  | 'Mar'
  | 'Apr'
  | 'May'
  | 'Jun'
  | 'Jul'
  | 'Aug'
  | 'Sep'
  | 'Oct'
  | 'Nov'
  | 'Dec';

// 1. if-elseバージョン
export const is31DaysIfElse = (month: Month): boolean => {
  if (
    month === 'Jan' ||
    month === 'Mar' ||
    month === 'May' ||
    month === 'Jul' ||
    month === 'Aug' ||
    month === 'Oct' ||
    month === 'Dec'
  ) {
    return true;
  } else {
    return false;
  }
};

// 2. switchバージョン
export const is31DaysSwitch = (month: Month): boolean => {
  switch (month) {
    case 'Jan':
    case 'Mar':
    case 'May':
    case 'Jul':
    case 'Aug':
    case 'Oct':
    case 'Dec':
      return true;
    default:
      return false;
  }
};
