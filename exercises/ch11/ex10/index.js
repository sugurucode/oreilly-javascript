// 特定の月を数値の引数で受け取り、日数を返す関数
const getDaysInMonth = (month) => {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month < 1 || month > 12) return undefined;
  return daysInMonth[month - 1];
};

// 期間の開始日と終了日を'YYYY-MM-DD'形式の日付で二つ引数で受け取り、その期間(開始日と終了日を含む)の土日以外の日数を返す関数
const countWeekdays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let count = 0; // 平日の日数をカウント

  for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
    const day = date.getDay(); // 曜日を取得
    // getDay() -> 0:日曜日, 1:月曜日, 2:火曜日, 3:水曜日, 4:木曜日, 5:金曜日, 6:土曜日
    // 0が日曜日、6が土曜日
    if (day !== 0 && day !== 6) {
      // 土日以外
      count++;
    }
  }

  return count;
};

// 'YYYY-MM-DD'形式の日付とロケールを引数で受け取り、その日の曜日をロケールの形式の文字列で返す関数
const getWeekdayName = (dateString, locale) => {
  const date = new Date(dateString);
  // ロケールの形式とは？ -> 例えば、'en-US'なら英語、'ja-JP'なら日本語
  return date.toLocaleDateString(locale, { weekday: 'long' });
};

//ローカルのタイムゾーンにおいて先月 1 日 0 時 0 分 0 秒の Date オブジェクトを返す関数。ただし getMonth、setMonth は利用してはいけない。
const getFirstDayOfLastMonth = () => {
  const now = new Date(); // 現在の日付を取得
  const year = now.getFullYear(); // 現在の年を取得
  const month = now.getMonth(); // 現在の月を取得 (0-11)
  // 先月の1日を取得
  return new Date(year, month - 1, 1, 0, 0, 0); // 月は0から始まるため、month - 1で先月を指定
};

export { getDaysInMonth, countWeekdays, getWeekdayName, getFirstDayOfLastMonth };
