// わからなかったので、newCounterまで。当日までに考える。
export function counterGroup() {
  return {
    newCounter: function () {
      let n = 0;

      // 文中のcountとreset同等の機能を持つ
      const counter = {
        count: function () {
          return n++;
        },
        reset: function () {
          n = 0;
        },
        // total、averageで利用するため追加
        getCount: function () {
          return n;
        },
      };
      // counterオブジェクトを返却する
      return counter;
    },
  };
}
const group = counterGroup();
const c1 = group.newCounter();
const c2 = group.newCounter();

c1.count(); // 0
c1.count(); // 1
c2.count(); // 0
