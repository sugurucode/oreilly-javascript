// テスト実行できないので後回し
export class C {
  // C.method()
  static method() {
    return 1;
  }
  // new C().method()（インスタンス作ってから呼び出し）
  method() {
    return 2;
  }
  // C.C.method()（クラスCのstaticプロパティCにアクセスして、そのクラスメソッドを呼び出し）
  static C = class {
    static method() {
      return 3;
    }
    // new C.C().method()（クラスCのstaticプロパティCにアクセスして、そのクラスのインスタンスを作り、メソッドを呼び出し）
    method() {
      return 4;
    }
  };

  // new C().C.method()（new c()でCのインスタンス作成。.Cでgetterが呼ばれる。）
  get C() {
    // このgetterは「new C().C」がアクセスされたときの返り値（暗黙的にgetが呼ばれる）
    // ここで、staticプロパティのCクラスを継承した別クラスを返し、
    // メソッドの振る舞いを変える
    const ParentC = (this.constructor as typeof C).C; // ここはわからない。
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
