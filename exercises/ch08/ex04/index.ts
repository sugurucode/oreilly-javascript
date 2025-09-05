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
