"use strict";
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
// ソート用の比較関数
function compareStudents(a, b) {
    if (b.math !== a.math)
        return b.math - a.math;
    if (b.chemistry !== a.chemistry)
        return b.chemistry - a.chemistry;
    return b.geography - a.geography;
}
const sortStudents = (arr) => {
    return [...arr].sort(compareStudents);
};
const sorted = sortStudents(data);
console.log(sorted);
// suguru@A081003065:~/oreilly_javascript7$ npm run tsrun exercises-public/exercises/ch07/ex06/index.ts
// > preset-ts@1.0.0 tsrun
// > sh -c 'tsc $1 && node ${1%.ts}.js' -- exercises-public/exercises/ch07/ex06/index.ts
// [
//     { name: 'Frank',  class: 'B', math: 90, chemistry: 70, geography: 80 },
//     { name: 'Justin', class: 'C', math: 80, chemistry: 40, geography: 30 },
//     { name: 'Carol',  class: 'A', math: 70, chemistry: 55, geography: 30 },
//     { name: 'Isaac',  class: 'C', math: 70, chemistry: 40, geography: 50 },
//     { name: 'Mallet', class: 'C', math: 60, chemistry: 70, geography: 90 },
//     { name: 'Ellen',  class: 'B', math: 60, chemistry: 70, geography: 40 },
//     { name: 'Bob',    class: 'A', math: 50, chemistry: 50, geography: 60 },
//     { name: 'Dave',   class: 'B', math: 40, chemistry: 20, geography: 60 },
//     { name: 'Alice',  class: 'A', math: 10, chemistry: 30, geography: 20 }
//   ]
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxJQUFJLEdBQUc7SUFDWCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUNyRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUNuRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUNyRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUNwRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUNyRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUNyRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUNyRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUN0RSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtDQUN2RSxDQUFDO0FBRUYsWUFBWTtBQUNaLFNBQVMsZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzNCLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsSUFBSTtRQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzlDLElBQUksQ0FBQyxDQUFDLFNBQVMsS0FBSyxDQUFDLENBQUMsU0FBUztRQUFFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ2xFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDO0FBQ25DLENBQUM7QUFFRCxNQUFNLFlBQVksR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQzNCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN4QyxDQUFDLENBQUM7QUFFRixNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUVwQix1R0FBdUc7QUFFdkcsMEJBQTBCO0FBQzFCLHdGQUF3RjtBQUV4RixJQUFJO0FBQ0osOEVBQThFO0FBQzlFLDhFQUE4RTtBQUM5RSw4RUFBOEU7QUFDOUUsOEVBQThFO0FBQzlFLDhFQUE4RTtBQUM5RSw4RUFBOEU7QUFDOUUsOEVBQThFO0FBQzlFLDhFQUE4RTtBQUM5RSw2RUFBNkU7QUFDN0UsTUFBTSJ9