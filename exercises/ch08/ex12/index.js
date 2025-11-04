function f(param) {
  // 最大10個の引数名を生成
  const args = [];
  for (let i = 1; i <= 10; i++) {
    args.push(`$${i}`);
  }
  console.log(args);

  // param内で使われている$Nだけを抽出
  const dollArgs = args.filter((arg) => param.includes(arg));
  // 実際の引数名（a1, a2, ...）に置換
  let fnparam = param;
  dollArgs.forEach((arg, i) => {
    // $NをaNに置換
    const replace = new RegExp(`\\${arg}`, 'g');
    fnparam = fnparam.replace(replace, `a${i + 1}`);
  });
  //fnparam→$1 +$2→a1 + a2
  // 関数本体が{ ... }で囲まれていればそのまま、そうでなければreturnを付与
  const trimmed = fnparam.trim();
  if (!(trimmed.startsWith('{') && trimmed.endsWith('}'))) {
    fnparam = `return (${fnparam});`;
  }
  // Functionコンストラクタで関数生成
  return new Function(...dollArgs.map((_, i) => `a${i + 1}`), fnparam);
}

module.exports = { f };
