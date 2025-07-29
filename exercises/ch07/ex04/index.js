var data = [
    { name: 'Alice', class: 'A', math: 10, chemistry: 30, geography: 20 },
    { name: 'Bob', class: 'A', math: 50, chemistry: 50, geography: 60 },
    { name: 'Carol', class: 'A', math: 70, chemistry: 55, geography: 30 },
    { name: 'Dave', class: 'B', math: 40, chemistry: 20, geography: 60 },
    { name: 'Ellen', class: 'B', math: 60, chemistry: 70, geography: 40 },
    { name: 'Frank', class: 'B', math: 90, chemistry: 70, geography: 80 },
    { name: 'Isaac', class: 'C', math: 70, chemistry: 40, geography: 50 },
    { name: 'Justin', class: 'C', math: 80, chemistry: 40, geography: 30 },
    { name: 'Mallet', class: 'C', math: 60, chemistry: 70, geography: 90 },
];
// 1. mathの全員の合計点
var totalMath = data.reduce(function (sum, student) { return sum + student.math; }, 0);
console.log('mathの合計点:', totalMath);
// 2. クラスAのchemistryの平均点
// クラスAに絞る
var classAChemistry = data.filter(function (s) { return s.class === 'A'; });
// chemistryの平均点を計算
var avgChemA = classAChemistry.reduce(function (sum, s) { return sum + s.chemistry; }, 0) / classAChemistry.length;
console.log('クラスA chemistry平均:', avgChemA);
// 3. 3科目合計点のクラスC内での平均点
var classC = data.filter(function (s) { return s.class === 'C'; });
var avgTotalC = classC.reduce(function (sum, s) { return sum + (s.math + s.chemistry + s.geography); }, 0) / classC.length;
console.log('クラスC 3科目合計の平均:', avgTotalC);
// 4. 3科目合計点が最も高い人のname
var topStudent = data.reduce(function (max, s) {
    var total = s.math + s.chemistry + s.geography;
    var maxTotal = max.math + max.chemistry + max.geography;
    console.log('s=' + s.name);
    console.log('max=' + max.name);
    return total > maxTotal ? s : max;
});
console.log('合計点が最も高い人:', topStudent.name);
// 5. 全体のgeographyの標準偏差
var geo = data.map(function (s) { return s.geography; });
var meanGeo = geo.reduce(function (a, b) { return a + b; }, 0) / geo.length;
var stdGeo = Math.sqrt(geo.reduce(function (sum, g) { return sum + Math.pow((g - meanGeo), 2); }, 0) / geo.length);
console.log('geographyの標準偏差:', stdGeo);
