export class C {
  x = 42;
}

// プライべート使ってアクセスできなくしている。
export class privateC {
  // #はprivateと同じ
  #x = 42;
  getX() {
    return this.#x;
  }
}

// クロージャを使ったCのバージョン
export function createC() {
  let x = 42;
  return {
    getX: function () {
      return x;
    },
  };
}
