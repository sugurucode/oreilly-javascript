"use strict";
function f() {
    try {
        return true;
    }
    finally {
        // eslint-disable-next-line no-unsafe-finally
        return false;
    }
}
console.log(f());
//  npx tsx exercises-public/exercises/ch05/ex07/index.ts
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsU0FBUyxDQUFDO0lBQ1IsSUFBSSxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO1lBQVMsQ0FBQztRQUNULDZDQUE2QztRQUM3QyxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7QUFDSCxDQUFDO0FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRWpCLHlEQUF5RCJ9