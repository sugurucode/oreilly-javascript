export class C {
  x = 42;
}

// クロージャを使ったCのクラス版
export class ClosureC {
  // #はprivateと同じ
  #x = 42;
  getX() {
    return this.#x;
  }
}
