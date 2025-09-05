// オブジェクトリテラルによる極座標・デカルト座標変換オブジェクト
export const polarPoint = {
  r: 1, //距離
  theta: 0, // 角度
  get x() {
    return this.r * Math.cos(this.theta);
  },
  set x(value) {
    if (Number.isNaN(value)) throw new Error('xにNaNは設定できません');
    const y = this.y;
    // x,yを距離に変換
    this.r = Math.sqrt(value * value + y * y);
    // atan2で極座標の角度を求められる。
    this.theta = Math.atan2(y, value);
  },
  get y() {
    return this.r * Math.sin(this.theta);
  },
  set y(value) {
    if (Number.isNaN(value)) throw new Error('yにNaNは設定できません');
    const x = this.x;
    // xの式はhypotを使うと簡潔に書ける。
    this.r = Math.hypot(x, value);
    this.theta = Math.atan2(value, x);
  },
};
