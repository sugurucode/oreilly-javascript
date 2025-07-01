function f() {
  try {
    return true;
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return false;
  }
}

console.log(f());

//  npx tsx exercises-public/exercises/ch05/ex07/index.ts
