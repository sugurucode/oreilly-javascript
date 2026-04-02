(() => {
    "use strict"; // 1. を付けてる
    // importのrengergrid。(複数個所で呼ばれてるので関数として定義してるらしい)
    // 2.変数名を一文字に変換
    function e(e, t, n, l, o) {
      for (let c = 0; c < n; c++)
        for (let n = 0; n < l; n++) {
          const l = e[c][n];
          (t.beginPath(),
            t.rect(n * o, c * o, o, o),
            (t.fillStyle = l ? "black" : "white"),
            t.fill(),
            t.stroke());
        }
    }

    // 一方updateGridは、呼び出し箇所が1つしかないので、関数を定義せずに直接インライン化されている


    const t = document.querySelector("#screen"),
      n = t.getContext("2d"),
      l = document.querySelector("#start"),
      o = document.querySelector("#pause");
      // 3. 定数のを計算済みにしてる（ROWS*RESOLUTION=500）
    ((t.width = 500), (t.height = 500));
    let c = null;
    const i = new Audio("/ch15.04-10/ex10/decision1.mp3");
    let r = new Array(50)
      .fill(null)
      .map(() =>
        // 4. Math.random() * 2の計算順序を逆にしてる
        new Array(50).fill(null).map(() => !!Math.floor(2 * Math.random())),
      );
      // canvasがクリックされたときの処理（セルの値を反転する）
    t.addEventListener("click", function (n) {
      const l = t.getBoundingClientRect(),
        o = n.clientX - l.left,
        c = n.clientY - l.top,
        a = Math.floor(c / 10),
        u = Math.floor(o / 10);
      // 5. 3行をカンマ区切りで一行に
      // grid[row][col] = !grid[row][col];
      // sound.cloneNode().play();
      // renderGrid(grid);
      ((r[a][u] = !r[a][u]), i.cloneNode().play(), e(r));
    });
    let a = 0;
    // 6. const INTERVAL = 100が消えた？

    // timeStampはrequestAnimationFrameから渡される
    // timeStampとは、アニメーションが開始されてからの経過時間をミリ秒単位で表したもの
    function u(t) {
      // 7. void 0でundefinedを表現し短くしている
      // 8. if文を論理演算子&&で置き換え
      (void 0 === a && (a = t),
        t - a >= 100 &&
          // 8. updateGrid関数をインライン化（即時実行関数）
          ((r = (function (e) {
            const t = e.map((e) => [...e]);
            for (let n = 0; n < 50; n++)
              for (let l = 0; l < 50; l++) {
                let o = 0;
                for (let t = -1; t <= 1; t++)
                  for (let c = -1; c <= 1; c++) {
                    if (0 === t && 0 === c) continue;
                    const i = n + t,
                      r = l + c;
                    i >= 0 && i < 50 && r >= 0 && r < 50 && e[i][r] && o++;
                  }
                const c = e[n][l];
                // 9. if-else文を三項演算子と論理演算子||で置き換え
                c && (o < 2 || o > 3)
                  ? (t[n][l] = !1)
                  : c || 3 !== o || (t[n][l] = !0);
              }
            return t;
          })(r)),
          e(r, n, 50, 50, 10),
          (a = t)),
        (c = requestAnimationFrame(u)));
    }
    // 10. 全体を即時実行関数としてまとめてる→なんで？
    (l.addEventListener("click", () => {
      c || u();
    }),
      o.addEventListener("click", () => {
        c && (cancelAnimationFrame(c), (c = null));
      }),
      e(r));
  })();
  
  // 他：
  // 3つのファイル（index.js, renderGrid.js, updateGrid.js）を1つに統合
  // - import/exportを削除
  // - 空白・改行を削除して一行にしている
  