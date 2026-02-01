(function updateClock() {
  // SVG 時計の画像を更新して現在時刻を表示する。
  let now = new Date(); // 現在時刻。
  let sec = now.getSeconds(); // 秒。
  let min = now.getMinutes() + sec / 60; // 小数部を持つ分。
  let hour = (now.getHours() % 12) + min / 60; // 小数部を持つ時。

  // 角度の計算
  let secangle = sec * 6; // 1 秒あたり6 度。
  let minangle = min * 6; // 1 分あたり6 度。
  let hourangle = hour * 30; // 1 時間あたり30 度。

  // 時計の針のSVG 要素を取得する。(既存の針を取得)
  let minhand = document.querySelector('#clock .minutehand');
  let hourhand = document.querySelector('#clock .hourhand');
  // 秒針の取得
  let sechand = document.querySelector('#clock .secondhand');
  if (!sechand) {
    // SVGの名前空間を指定して要素を作成
    // http://www.w3.org/2000/svgはブラウザがSVG要素を作成するために必要な名前空間URI
    sechand = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    sechand.setAttribute('class', 'secondhand');

    // createElementNSでsvgのline要素を作成したことで、
    // line要素の属性を設定する必要がある。
    // SVGのline要素は、x1, y1, x2, y2 属性で線の始点と終点の座標を指定する。
    // 座標を設定 (中心50,50 から 上方向へ)
    // 分針(y2=20)より少し長くするために y2=10 くらいに設定
    sechand.setAttribute('x1', '50');
    sechand.setAttribute('y1', '50');
    sechand.setAttribute('x2', '50');
    sechand.setAttribute('y2', '10');

    // スタイルを設定 (赤くて細い線にする)
    sechand.style.stroke = 'red';
    sechand.style.strokeWidth = '1px';

    // 時計の針のグループ(.hands)に追加
    document.querySelector('#clock .hands').appendChild(sechand);
  }

  // SVG 属性を設定して、時計盤の中で回転する。
  minhand.setAttribute('transform', `rotate(${minangle},50,50)`);
  hourhand.setAttribute('transform', `rotate(${hourangle},50,50)`);
  // 50,50は回転の中心座標
  sechand.setAttribute('transform', `rotate(${secangle},50,50)`);
  // 10 秒後にこの関数を再度実行する。
  setTimeout(updateClock, 10000);
})(); // ここで関数を即座に実行していることに注意。
