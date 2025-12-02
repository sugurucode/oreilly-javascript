"use strict";
const obj = {
    om: function () {
        console.log(this);
        const nest = {
            nm: function () {
                console.log(this === obj, this === nest);
            },
            arrow: () => {
                console.log(this === obj, this === nest);
            },
        };
        nest.nm();
        nest.arrow();
    },
};
obj.om();
// suguru@A081003065:~/oreilly_javascript7$ npm run tsrun -- exercises-public/exercises/ch08/ex04/index.ts
// > preset-ts@1.0.0 tsrun
// > tsx exercises-public/exercises/ch08/ex04/index.ts
// false true
// true false
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxHQUFHLEdBQUc7SUFDVixFQUFFLEVBQUU7UUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxCLE1BQU0sSUFBSSxHQUFHO1lBQ1gsRUFBRSxFQUFFO2dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsRUFBRSxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUM7WUFDM0MsQ0FBQztZQUNELEtBQUssRUFBRSxHQUFHLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxFQUFFLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQztZQUMzQyxDQUFDO1NBQ0YsQ0FBQztRQUNGLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNWLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7Q0FDRixDQUFDO0FBQ0YsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDO0FBRVQsMEdBQTBHO0FBRTFHLDBCQUEwQjtBQUMxQixzREFBc0Q7QUFFdEQsYUFBYTtBQUNiLGFBQWEifQ==