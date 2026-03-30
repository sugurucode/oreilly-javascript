// Life Game のルールに従ってセルを更新する
export function updateGrid(grid, ROWS, COLS) {
  const nextGrid = grid.map(arr => [...arr]);
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          const x = row + i;
          const y = col + j;
          if (x >= 0 && x < ROWS && y >= 0 && y < COLS) {
            if (grid[x][y]) neighbors++;
          }
        }
      }
      const currentState = grid[row][col];
      if (currentState && (neighbors < 2 || neighbors > 3)) {
        nextGrid[row][col] = false;
      } else if (!currentState && neighbors === 3) {
        nextGrid[row][col] = true;
      }
    }
  }
  return nextGrid;
}
