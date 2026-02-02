const ROWS = 50;
const COLS = 50;
const RESOLUTION = 10;

const canvas = document.querySelector('#screen');
const ctx = canvas.getContext('2d');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

const sound = new Audio('/ch15.04-10/ex10/decision1.mp3');

// WebSocket 接続を開始
const socket = new WebSocket('ws://localhost:3003');

// サーバーからデータを受信した時の処理
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'update') {
    renderGrid(data.grid);
  }
};

// 描画処理
function renderGrid(grid) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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

// canvas がクリックされたときの処理 (サーバーに通知)
canvas.addEventListener('click', function (evt) {
  const rect = canvas.getBoundingClientRect();
  const row = Math.floor((evt.clientY - rect.top) / RESOLUTION);
  const col = Math.floor((evt.clientX - rect.left) / RESOLUTION);

  socket.send(JSON.stringify({ type: 'toggle', row, col }));
  sound.cloneNode().play();
});

// 開始ボタン
startButton.addEventListener('click', () => {
  socket.send(JSON.stringify({ type: 'start' }));
});

// 一時停止ボタン
pauseButton.addEventListener('click', () => {
  socket.send(JSON.stringify({ type: 'pause' }));
});
