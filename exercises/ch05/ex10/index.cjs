/* eslint-disable no-with */
// CommonJSにすれば非strict
{
  let a = 1;
  let b = 2;
  let obj = { a: 3, b: 4 };
  // strict modeを解除するため、with文の前に'use strict'を入れない
  with (obj) {
    a = b;
  }
  console.log({ a, b, obj });
}
{
  let a = 1;
  let b = 2;
  let obj = { b: 4 };
  with (obj) {
    a = b;
  }
  console.log({ a, b, obj });
}
{
  let a = 1;
  let b = 2;
  let obj = { a: 3 };
  with (obj) {
    a = b;
  }
  console.log({ a, b, obj });
}
{
  let a = 1;
  let b = 2;
  let obj = {};
  with (obj) {
    a = b;
  }
  console.log({ a, b, obj });
}
