const data = [
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
const totalMath = data.reduce((sum, student) => sum + student.math, 0);
console.log('mathの合計点:', totalMath);

// 2. クラスAのchemistryの平均点
// クラスAに絞る
const classAChemistry = data.filter((s) => s.class === 'A');
// chemistryの平均点を計算
const avgChemA = classAChemistry.reduce((sum, s) => sum + s.chemistry, 0) / classAChemistry.length;
console.log('クラスA chemistry平均:', avgChemA);

// 3. 3科目合計点のクラスC内での平均点
const classC = data.filter((s) => s.class === 'C');
const avgTotalC =
  classC.reduce((sum, s) => sum + (s.math + s.chemistry + s.geography), 0) / classC.length;
console.log('クラスC 3科目合計の平均:', avgTotalC);

// 4. 3科目合計点が最も高い人のname
const topStudent = data.reduce((max, s) => {
  const total = s.math + s.chemistry + s.geography;
  const maxTotal = max.math + max.chemistry + max.geography;
  console.log('s=' + s.name);
  console.log('max=' + max.name);

  return total > maxTotal ? s : max;
});
console.log('合計点が最も高い人:', topStudent.name);

// 5. 全体のgeographyの標準偏差
const geo = data.map((s) => s.geography);
// avgとmeanの違いなんだっけ
const avgGeo = geo.reduce((a, b) => a + b, 0) / geo.length;
const stdGeo = Math.sqrt(geo.reduce((sum, g) => sum + (g - avgGeo) ** 2, 0) / geo.length);
console.log('geographyの標準偏差:', stdGeo);
