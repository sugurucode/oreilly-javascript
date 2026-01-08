// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector('#screen');
const ctx = canvas.getContext('2d');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID
let animationId = null;

// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio('/ch15.04-10/ex10/decision1.mp3');

// ライフゲームのセル (true or false) をランダムに初期化する
let grid = new Array(ROWS)
  .fill(null)
  .map(() => new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2)));

// grid を canvas に描画する
function renderGrid(grid) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? 'black' : 'white';
      ctx.fill();
      ctx.stroke();
    }
  }
}

// Life Game のルールに従ってセルを更新する
function updateGrid(grid) {
  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)
      // 周囲の生存セル数
      let neighbors = 0;

      // 自分の周囲 3x3 の範囲をループしてneighborsを数える
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          // i=0, j=0 の時は自分自身なのでスキップ
          if (i === 0 && j === 0) continue;

          const x = row + i;
          const y = col + j;

          // 盤面の範囲内かどうかをチェック（インデックスが 0以上 かつ 最大値未満か）
          if (x >= 0 && x < ROWS && y >= 0 && y < COLS) {
            // 生きていれば (true) 1増やす
            if (grid[x][y]) {
              neighbors++;
            }
          }
        }
      }
      // neighbors の値に基づいてrow,colに対してライフゲームのルールを適用
      const currentState = grid[row][col];

      if (currentState && (neighbors < 2 || neighbors > 3)) {
        // 【死滅】過疎(1以下)または過密(4以上)
        nextGrid[row][col] = false;
      } else if (!currentState && neighbors === 3) {
        // 【誕生】死んでいるセルに隣接する生きたセルがちょうど3つ
        nextGrid[row][col] = true;
      }
      // それ以外（生存している状態で隣接が2か3）は、元の状態を維持
    }
  }
  return nextGrid;
}

// canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener('click', function (evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);
  grid[row][col] = !grid[row][col];
  sound.cloneNode().play();
  renderGrid(grid);
});

// requestAnimationFrame によって一定間隔で更新・描画を行う
// TODO: リフレッシュレートの高い画面では速く実行されてしまうため、以下を参考に更新頻度が常に一定となるようにしなさい
// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame
let previousTimeStamp = 0; // 前回の描画時刻を記録
const INTERVAL = 100; // 100ミリ秒（0.1秒）ごとに更新したい

// timeStampはrequestAnimationFrameから渡される
function update(timeStamp) {
  // previousTimeStamp が未定義の場合はtimeStampを設定

  if (previousTimeStamp === undefined) {
    previousTimeStamp = timeStamp;
  }

  // 前回のrenderGridからの経過時間を計算
  const elapsed = timeStamp - previousTimeStamp;

  if (elapsed >= INTERVAL) {
    // updateGrid で grid を更新
    grid = updateGrid(grid);
    // renderGrid で grid を描画
    renderGrid(grid);
    // previousTimeStampを現在のtimeStampに更新
    previousTimeStamp = timeStamp;
  }
  // 100ms経っていなければスキップして次のフレームへ
  // requestAnimationFrame で次のフレームを予約
  animationId = requestAnimationFrame(update);
}

startButton.addEventListener('click', () => {
  // 既にアニメーションが動いている場合は何もしない
  if (animationId) {
    return;
  }
  update();
});

pauseButton.addEventListener('click', () => {
  // アニメーションが停止している場合は何もしない
  if (!animationId) {
    return;
  }
  cancelAnimationFrame(animationId);
  animationId = null;
});

renderGrid(grid);
