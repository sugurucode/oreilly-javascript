// 値を呼び出す度に１増やすclass
export class C {
  private count = 0;
  get x() {
    return this.count++;
  }
}
