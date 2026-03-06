import readline from 'readline';
import { spawn } from 'child_process';
import fs from 'fs';
import { PassThrough } from 'stream';

// コマンドの実行
class ExecCmd {
  constructor(argv) {
    this.type = ' ';
    this.argv = argv;
  }
}

// リダイレクト
class RedirCmd {
  constructor(cmd, file, type) {
    this.type = type; // "<" or ">"
    this.cmd = cmd;
    this.file = file;
  }
}

// パイプ
class PipeCmd {
  constructor(left, right) {
    this.type = '|';
    this.left = left;
    this.right = right;
  }
}

// NOTE: 以下のコマンドをパースした場合:
// ```
// echo HELLO | tr [:upper:] [:lower:] > hello.txt
//```
// 以下のようなオブジェクトが生成されるものとする
// new PipeCmd(
//   new ExecCmd(["echo", "HELLO"]),
//   new RedirCmd(new ExecCmd(["tr", "[:upper:]", "[:lower:]"]), "hello.txt", ">")
// )

// コマンドを実行する関数
async function runcmd(cmd, stdin = null, stdout = null) {
  console.log('Running command:', cmd);
  switch (cmd.type) {
    case ' ': // ExecCmd
      await new Promise((resolve, reject) => {
        // stdin, stdout が指定されている場合はパイプを作成する
        const child = spawn(cmd.argv[0], cmd.argv.slice(1), {
          stdio: [stdin ? 'pipe' : 'inherit', stdout ? 'pipe' : 'inherit', 'inherit'],
        });

        if (stdin) {
          stdin.pipe(child.stdin);
        }
        if (stdout) {
          child.stdout.pipe(stdout);
        }

        child.on('exit', () => resolve());
        child.on('error', (err) => reject(err));
      });
      break;

    case '>': // 書き込みリダイレクト
      {
        // FIXME: ここを実装してね (2行程度)
        // HINT: cmd.file のストリームを createWriteStream で作成し runcmd を再帰的に呼び出す
        const out = fs.createWriteStream(cmd.file);
        await runcmd(cmd.cmd, stdin, out);
      }
      break;

    case '<': // 読み込みリダイレクト
      {
        // FIXME: ここを実装してね (2行程度)
        // HINT: cmd.file のストリームを createReadStream で作成し runcmd を再帰的に呼び出す
        const ins = fs.createReadStream(cmd.file);
        await runcmd(cmd.cmd, ins, stdout);
      }
      break;

    case '|': // パイプ
      {
        // FIXME: ここを実装してね (4行程度)
        // HINT: cmd.left と cmd.right に対して runcmd を再帰的に呼び出し Promise.all で待つ
        // HINT: left と right を繋ぐには new PassThrought() で作成したストリームを使用する
        const p = new PassThrough();
        // 左側の出力を PassThrough に流し、右側の入力として PassThrough を渡す
        await Promise.all([
          // 左側のコマンドが終了したら p.end() を呼んで「送信終了」を伝える
          runcmd(cmd.left, stdin, p).then(() => p.end()),
          runcmd(cmd.right, p, stdout),
        ]);
      }
      break;

    default:
      console.error('unknown runcmd');
      process.exit(-1);
  }
}

// メイン関数
async function main() {
  // createInterface で readline インターフェースを作成する
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
    terminal: false, // これを false にすると、プロンプトが表示される前にユーザーの入力が表示されるようになる
  });

  rl.prompt(); // > を表示

  for await (const rawLine of rl) {
    const line = rawLine.trim();
    if (line === '') {
      rl.prompt();
      continue;
    }
    if (line.startsWith('cd ')) {
      const dir = line.slice(3).trim();
      try {
        process.chdir(dir.trim());
      } catch (err) {
        console.error(`cannot cd ${dir}`);
      }
    } else {
      const cmd = parsecmd(line);
      try {
        rl.pause();
        await runcmd(cmd);
      } catch (err) {
        console.error(err);
      } finally {
        rl.resume();
      }
    }
    rl.prompt();
  }
}

// コマンドのパースに使用する文字
const symbols = '<>';

// コマンド文字列を解析する関数
function parsecmd(input) {
  const cmds = input.split('|').map((cmd) => cmd.trim());
  const parsedCmds = cmds.map((cmd) => parseexec(tokenize(cmd)));
  return parsedCmds.reduce((prev, curr) => new PipeCmd(prev, curr));
}

// 入力をトークンに分割する関数
function tokenize(input) {
  // NOTE: `A B "C D" 'E F G'` は ["A", "B", "C D", "E F G"] に変換される
  return input
    .match(/'[^']*'|"[^"]*"|\S+/g)
    .map((s) => s.replace(/^['"]|['"]$/g, ''))
    .filter((s) => s !== '');
}

// ">" や "<" を見つけて RedirCmd に変換する
function parseredirs(cmd, tokens) {
  let redirectIndex = tokens.findIndex((token) => symbols.includes(token));

  while (redirectIndex !== -1) {
    const symbol = tokens[redirectIndex];
    const file = tokens[redirectIndex + 1];

    if (!file) {
      console.error('missing file for redirection');
      process.exit(-1);
    }

    cmd = new RedirCmd(cmd, file, symbol);
    tokens.splice(redirectIndex, 2);
    redirectIndex = tokens.findIndex((token) => symbols.includes(token));
  }

  return cmd;
}

function parseexec(tokens) {
  const argv = [];
  // NOTE: parsedirs によって tokens の中身が変更される (">", "foo.txt" といったリダイレクトが削除)
  const cmd = parseredirs(new ExecCmd(argv), tokens);
  // NOTE: 残った tokens を argv に追加する
  argv.push(...tokens);
  return cmd;
}

main();
