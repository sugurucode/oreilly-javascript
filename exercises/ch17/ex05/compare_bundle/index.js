import { renderGrid } from "./renderGrid.js";
import { updateGrid } from "./updateGrid.js";

// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID
let animationId = null;

// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio("/ch15.04-10/ex10/decision1.mp3");

// ライフゲームのセル (true or false) をランダムに初期化する
let grid = new Array(ROWS)
  .fill(null)
  .map(() =>
    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2)),
  );

// canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener("click", function (evt) {
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
// timeStampとは、アニメーションが開始されてからの経過時間をミリ秒単位で表したもの
function update(timeStamp) {
  // previousTimeStamp が未定義の場合はtimeStampを設定

  if (previousTimeStamp === undefined) {
    previousTimeStamp = timeStamp;
  }

  // 前回のrenderGridからの経過時間を計算
  const elapsed = timeStamp - previousTimeStamp;
  // アニメーション開始から100ms以上経っている場合のみ更新・描画を行う
  if (elapsed >= INTERVAL) {
    // updateGrid で grid を更新
    grid = updateGrid(grid, ROWS, COLS); // 引数を追加
    // renderGrid で grid を描画
    renderGrid(grid, ctx, ROWS, COLS, RESOLUTION); // 引数を追加
    // previousTimeStampを現在のtimeStampに更新
    previousTimeStamp = timeStamp;
  }
  // 100ms経っていなければスキップして次のフレームへ
  // requestAnimationFrame で次のフレームを予約
  animationId = requestAnimationFrame(update);
}

startButton.addEventListener("click", () => {
  // 既にアニメーションが動いている場合は何もしない
  if (animationId) {
    return;
  }
  update();
});

pauseButton.addEventListener("click", () => {
  // アニメーションが停止している場合は何もしない
  if (!animationId) {
    return;
  }
  cancelAnimationFrame(animationId);
  animationId = null;
});

renderGrid(grid);
