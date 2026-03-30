#!/usr/bin/env node
// github.js から関数をインポートする
import { listIssues, createIssue, closeIssue } from './github.js';

const HELP_TEXT = `
Usage: node index.js [options] [command]

Commands:
  list            OpenなIssueの一覧を表示
  create <title>  Issueを新規作成
  close <number>  指定したIssueをクローズ

Options:
  -h, --help      使い方を表示
  -v, --verbose   HTTPリクエストのログを出力
`;

const args = process.argv.slice(2);
const showHelp = args.includes('-h') || args.includes('--help');
const verbose = args.includes('-v') || args.includes('--verbose');

const cmdArgs = args.filter((arg) => !arg.startsWith('-'));
const [command, value] = cmdArgs;

if (showHelp || !command) {
  console.log(HELP_TEXT);
  process.exit();
}

// トップレベルawaitを使用して、インポートした関数を呼び出す
if (command === 'list') {
  if (verbose) {
    console.log('GET /repos/{owner}/{repo}/issues');
  }

  const data = await listIssues(); // ライブラリの関数を呼び出す
  data.forEach((i) =>
    console.log(`Issueの番号: ${i.number}, タイトル: ${i.title}`),
  );
} else if (command === 'create' && value) {
  if (verbose) {
    console.log('POST /repos/{owner}/{repo}/issues');
  }

  const data = await createIssue(value); // ライブラリの関数を呼び出す
  console.log(`Issueを作成しました: #${data.number} ${data.title}`);
} else if (command === 'close' && value) {
  if (verbose) {
    console.log('PATCH /repos/{owner}/{repo}/issues/{issue_number}');
  }

  await closeIssue(value); // ライブラリの関数を呼び出す
  console.log(`Closed: #${value}`);
}
