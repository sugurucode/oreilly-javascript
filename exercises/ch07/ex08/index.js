export const reverse = (arr) => {
    // graphemeで絵文字や複合文字も一文字として扱う
    const segmenter = new Intl.Segmenter('ja-JP', { granularity: 'grapheme' });
    // Segmenterを使って文字列を分割
    const iterator = segmenter.segment(arr);
    // 各segmentオブジェクトから文字列を抽出
    const segments = [...iterator].map((seg) => seg.segment);
    console.log('segments:', segments); // segments: [ '𠮷', '野', '家' ]
    // 文字列を逆順にして結合
    return segments.reverse().join('');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFXLEVBQVUsRUFBRTtJQUM3Qyw2QkFBNkI7SUFDN0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQzNFLHNCQUFzQjtJQUN0QixNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hDLHlCQUF5QjtJQUN6QixNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQywrQkFBK0I7SUFDbkUsY0FBYztJQUNkLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUMifQ==