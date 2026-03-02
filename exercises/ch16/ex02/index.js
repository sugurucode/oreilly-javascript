import { spawn } from 'child_process';
import path from 'path';

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
  const childPath = path.join(__dirname, 'child.js');
  child = spawn('node', [childPath]);

  child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise((res) => {
    child.on('close', (code, signal) => {
      res([code, signal]);
    });
  });
}

// TODO: ここに処理を書く

// runChile関数にした理由は、子プロセスが異常終了したときに再起動するためです。
function runChild() {
  startChild().then(([code, signal]) => {
    // codeが0とは正常終了、signalがnullでない場合はシグナル終了を意味する
    if (code !== 0 && signal === null) {
      console.log(`code：${code} signal：${signal} → 子プロセスが異常終了したので再起動します。`);
      runChild();
    } else {
      console.log(`code：${code} signal：${signal} → 子プロセスが終了しました。`);
    }
  }); // 閉じカッコを追加
}

function main() {
  // 最初の子プロセスを起動
  runChild();

  // シグナルを二種類以上トラップし、そのシグナルと同じシグナルを子プロセスに通知。
  // 子プロセスがそのシグナルによって終了したことを確認し、自身も終了する

  // SIGINTはCtrl+Cで送られるシグナル
  process.on('SIGINT', () => {
    console.log('\nSIGINTを受け取りました。子プロセスに通知します。');
    if (child) {
      child.on('exit', () => {
        console.log('子プロセスの終了を確認しました。自分も終了します。');
        process.exit(0);
      });
      console.log('子プロセスにSIGINTを送信します。');
      child.kill('SIGINT');
    }
  });

  // SIGTERMはkillコマンドで送られるシグナル
  // 子プロセスをkillする場合、再起動されるとkillコマンドのPIDが変わるので、ちゃんと確認できない
  process.on('SIGTERM', () => {
    console.log('SIGTERMを受け取りました。子プロセスに通知します。');
    if (child) {
      child.on('exit', () => {
        console.log('子プロセスの終了を確認しました。自分も終了します。');
        process.exit(0);
      });
      child.kill('SIGTERM');
    }
  });
}

main();
