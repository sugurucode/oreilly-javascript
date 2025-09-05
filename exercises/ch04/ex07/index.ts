// 危険な関数例
function set42(key) {
  eval(`${key} = 42;`)
}

let a
// 悪用例: 意図しないコード実行(chat-gptの回答を参考にしています)
// 無限ループを発生させ、システムに負荷を与えます
//set42('while(true){} //')

// ブラウザ環境でアラートを表示。
//set42('alert("hacked") //')

// "hacked"と出力。
set42('console.log("hacked") //')
