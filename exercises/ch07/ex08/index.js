var reverse = function (arr) {
    try {
        var Segmenter = Intl.Segmenter;
        var segmenter = new Segmenter('ja-JP', { granularity: 'grapheme' });
        // 文字列を分割
        var iterator = segmenter.segment(arr);
        // 全要素を配列化して値を確認
        var segments = [];
        for (var _i = 0, iterator_1 = iterator; _i < iterator_1.length; _i++) {
            var seg = iterator_1[_i];
            console.log(seg); // 各segmentオブジェクトを確認
            segments.push(seg.segment);
        }
        console.log('segments:', segments); // 配列全体を確認
        return segments.reverse().join('');
    }
    catch (e) {
        console.error('Error:', e);
        return '';
    }
};
// 例: reverse("家族 👨‍👨‍👧‍👧") → "👨‍👨‍👧‍👧 族家"
console.log(reverse('家族 👨‍👨‍👧‍👧')); // ["👨‍👨‍👧‍👧", "族家"]
