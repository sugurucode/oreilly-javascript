// テスト実行できないので後回し
export class C {
  // C.method()
  static method() {
    return 1;
  }
  // new C().method()
  method() {
    return 2;
  }
  // C.C.method()
  static C = class {
    static method() {
      return 3;
    }
    // new C.C().method()
    method() {
      return 4;
    }
  };
  // new C().C.method()
  get C() {
    // このgetterは「new C().C」がアクセスされたときの返り値
    // ここで、staticプロパティのCクラスを継承した別クラスを返し、
    // メソッドの振る舞いを変える
    const ParentC = (this.constructor as typeof C).C;
    return class extends ParentC {
      static method() {
        return 5;
      }
      // new new C().C().method()
      method() {
        return 6;
      }
    };
  }
}
