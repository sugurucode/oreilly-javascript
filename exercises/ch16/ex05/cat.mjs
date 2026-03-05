import fs from 'fs';

// コマンドライン引数が2以上ならば、ファイルを読み込んで標準出力に出力
// そうでなければ、標準入力を標準出力に出力する

if (process.argv.length > 2) {
  // node cat.js foo.txt といった形式ならばファイルを読み込み標準出力に出力する
  // process.argvはコマンドライン引数の配列。process.argv[0]はnodeの実行ファイルのパス、process.argv[1]はスクリプトのパス
  fs.createReadStream(process.argv[2]).pipe(process.stdout);
} else {
  // そうでなければ標準入力を標準出力に出力する
  process.stdin.pipe(process.stdout);
}
