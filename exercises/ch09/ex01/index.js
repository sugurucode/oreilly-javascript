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
        const ParentC = this.constructor.C; // ここはわからない。
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpQkFBaUI7QUFDakIsTUFBTSxPQUFPLENBQUM7SUFDWixhQUFhO0lBQ2IsTUFBTSxDQUFDLE1BQU07UUFDWCxPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7SUFDRCxvQ0FBb0M7SUFDcEMsTUFBTTtRQUNKLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUNELHdEQUF3RDtJQUN4RCxNQUFNLENBQUMsQ0FBQyxHQUFHO1FBQ1QsTUFBTSxDQUFDLE1BQU07WUFDWCxPQUFPLENBQUMsQ0FBQztRQUNYLENBQUM7UUFDRCx5RUFBeUU7UUFDekUsTUFBTTtZQUNKLE9BQU8sQ0FBQyxDQUFDO1FBQ1gsQ0FBQztLQUNGLENBQUM7SUFFRix5REFBeUQ7SUFDekQsSUFBSSxDQUFDO1FBQ0gsbURBQW1EO1FBQ25ELG9DQUFvQztRQUNwQyxnQkFBZ0I7UUFDaEIsTUFBTSxPQUFPLEdBQUksSUFBSSxDQUFDLFdBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWTtRQUM5RCxPQUFPLEtBQU0sU0FBUSxPQUFPO1lBQzFCLE1BQU0sQ0FBQyxNQUFNO2dCQUNYLE9BQU8sQ0FBQyxDQUFDO1lBQ1gsQ0FBQztZQUNELDJCQUEyQjtZQUMzQixNQUFNO2dCQUNKLE9BQU8sQ0FBQyxDQUFDO1lBQ1gsQ0FBQztTQUNGLENBQUM7SUFDSixDQUFDIn0=