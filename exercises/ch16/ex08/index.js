#!/usr/bin/env node
import { Octokit } from 'octokit';

const HELP_TEXT = `
Usage: node index.js [options] [command]

Commands:
  list              OpenなIssueの一覧を表示
  create <title>    Issueを新規作成
  close <number>    指定したIssueをクローズ

Options:
  -h, --help        使い方を表示
  -v, --verbose     HTTPリクエストのログを出力
`;

// node index.js list などのコマンドとオプションを取得するために、slice(2)で最初の2つを除いた引数を取得する。
const args = process.argv.slice(2);

// オプションの抽出
// `-h`または`--help`オプションで使い方が確認できる
// `-v`または`--verbose`オプションで HTTP ログを出力する
const showHelp = args.includes('-h') || args.includes('--help');
const verbose = args.includes('-v') || args.includes('--verbose');

// オプションを除いた純粋な引数（コマンドと値）だけを取り出す
// node index.js -h listならば、argsは['-h', 'list']となる
// filterでオプションを除外して['list']だけを取得する。
const cmdArgs = args.filter((arg) => !arg.startsWith('-'));
// console.log(cmdArgs); // [ 'list' ] などのコマンドと値の配列
// create や close コマンドは、コマンドの後に値が必要なので
// cmdArgsからコマンドと値を分割して取得。
const [command, value] = cmdArgs;

// コマンドが指定されていない、またはヘルプオプションが指定されている場合は、HELP_TEXTを表示して終了
if (showHelp || !command) {
  console.log(HELP_TEXT);
  process.exit();
}
// Octokitのインスタンスを作成する際に、authオプションでGitHubトークンを指定。
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const repositoryInfo = { owner: 'sugurucode', repo: 'oreilly-javascript' };

if (command === 'list') {
  if (verbose) console.log('GET /repos/{owner}/{repo}/issues');
  // オープンなIssueの一覧取得にはstate: 'open'を指定する必要がある。
  const { data } = await octokit.rest.issues.listForRepo({ ...repositoryInfo, state: 'open' });
  // i.numberはIssueの番号、i.titleはIssueのタイトルを表す。
  data.forEach((i) => console.log(`Issueの番号: ${i.number}, タイトル: ${i.title}`));
} else if (command === 'create' && value) {
  if (verbose) console.log('POST /repos/{owner}/{repo}/issues');
  const { data } = await octokit.rest.issues.create({ ...repositoryInfo, title: value });
  console.log(`Issueを作成しました: #${data.number} ${data.title}`);
} else if (command === 'close' && value) {
  if (verbose) console.log('PATCH /repos/{owner}/{repo}/issues/{issue_number}');
  await octokit.rest.issues.update({
    ...repositoryInfo,
    issue_number: Number(value),
    state: 'closed',
  });
  console.log(`Closed: #${value}`);
}
