export const powerOptimizedRecursive = (x, n) => {
  // 0の0乗は1として扱う
  if (x === 0 && n === 0) {
    return 1;
  }
  // 指数が0の場合
  if (n === 0) {
    return 1;
  }
  // 負の指数の場合。正の指数に変換
  if (n < 0) {
    return 1 / powerOptimizedRecursive(x, -n);
  }
  // 指数が1の場合
  if (n === 1) {
    return x;
  }

  // 再帰ステップ (繰り返し二乗法)
  // Math.floorで整数のみ取得
  const halfPower = powerOptimizedRecursive(x, Math.floor(n / 2));
  if (n % 2 === 0) {
    // n が偶数の場合
    return halfPower * halfPower;
  } else {
    // n が奇数の場合(５ならx^2を二回掛けてxを1階掛ける)
    return x * halfPower * halfPower;
  }
};
