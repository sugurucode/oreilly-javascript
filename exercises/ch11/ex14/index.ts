// sortJapanese: 日本語文字列配列を、大文字・小文字、濁点・半濁点の違いを無視してソート
export function sortJapanese(arr: string[]): string[] {
  // sensitiveを'base'に設定して、濁点・半濁点の違いを無視
  return arr.slice().sort((a, b) => a.localeCompare(b, 'ja-JP', { sensitivity: 'base' }));
}

// toJapaneseDateString: Dateオブジェクトを和暦（令和y年m月d日）形式で文字列化
// 昭和以前は来ない前提
export function toJapaneseDateString(date: Date): string {
  const eras = [
    { name: '令和', start: new Date(2019, 4, 1) }, // 2019年5月1日
    { name: '平成', start: new Date(1989, 0, 8) }, // 1989年1月8日
    { name: '昭和', start: new Date(1926, 11, 25) }, // 1926年12月25日
  ];
  for (const era of eras) {
    if (date >= era.start) {
      const year = date.getFullYear() - era.start.getFullYear() + 1;
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${era.name}${year}年${month}月${day}日`;
    }
  }
  return '昭和以前は対応していません';
}
