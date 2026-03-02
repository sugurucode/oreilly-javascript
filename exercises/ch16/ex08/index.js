#!/usr/bin/env node
import { parseArgs } from 'node:util';

// 設定（環境変数または直接入力）
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'sugurucode'; // 書き換えてください
const REPO_NAME = 'oreilly-javascript'; // 書き換えてください

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

async function githubRequest(path, options = {}) {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}${path}`;
  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  };

  if (args.values.verbose) {
    console.error(`[LOG] ${options.method || 'GET'} ${url}`);
  }

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GitHub API Error: ${response.status} - ${error.message}`);
  }

  return response.json();
}

// 1. 一覧表示
async function listIssues() {
  const issues = await githubRequest('/issues?state=open');
  console.log('ID\tTitle');
  console.log('--\t-----');
  issues.forEach((i) => console.log(`${i.number}\t${i.title}`));
}

// 2. 作成
async function createIssue(title) {
  const res = await githubRequest('/issues', {
    method: 'POST',
    body: JSON.stringify({ title }),
  });
  console.log(`Issue Created: #${res.number}`);
}

// 3. クローズ
async function closeIssue(number) {
  await githubRequest(`/issues/${number}`, {
    method: 'PATCH',
    body: JSON.stringify({ state: 'closed' }),
  });
  console.log(`Issue #${number} closed.`);
}

// メイン処理
const args = parseArgs({
  options: {
    help: { type: 'boolean', short: 'h' },
    verbose: { type: 'boolean', short: 'v' },
  },
  allowPositionals: true,
});

try {
  if (!GITHUB_TOKEN) throw new Error('GITHUB_TOKEN environment variable is required.');

  const [command, value] = args.positionals;

  if (args.values.help || !command) {
    console.log(HELP_TEXT);
    process.exit(0);
  }

  switch (command) {
    case 'list':
      await listIssues();
      break;
    case 'create':
      if (!value) throw new Error('Title is required for create command.');
      await createIssue(value);
      break;
    case 'close':
      if (!value) throw new Error('Issue number is required for close command.');
      await closeIssue(value);
      break;
    default:
      console.log('Unknown command.');
      console.log(HELP_TEXT);
  }
} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
