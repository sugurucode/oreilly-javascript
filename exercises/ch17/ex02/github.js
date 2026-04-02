// ex08.jsから関数切り出し
import { Octokit } from 'octokit';
// pollyのため
import fetch from 'node-fetch';

// Octokitのインスタンスとリポジトリ情報を定義
// const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
// polly用
const octokit = new Octokit({ 
  // replayモードでもOctokitを「認証あり状態」で動かすため、トークンがない時はダミーを設定。
  // これがないと、recording時はAuthorizationヘッダーが付くのに、replay時は付かない
  // 
  auth: process.env.GITHUB_TOKEN || 'fake-token-for-replay', 
  // octokitは内部で標準のfetchを使用
  // pollyはこれをキャッチできないので、node-fetchを明示的に指定して、Pollyがリクエストをキャッチできるようにする。
  request: { 
    fetch
  },
  // Pollyが「1回目の認証失敗(401)」をレコーディングしてしまうのを防ぐため、
  // リトライ機能をオフにして、最初から成功する通信のみをPollyに渡す。
  retry: { enabled: false }, 
});
const repositoryInfo = { owner: 'sugurucode', repo: 'oreilly-javascript' };

// OpenなIssueの一覧を取得する関数
export async function listIssues() {
  const { data } = await octokit.rest.issues.listForRepo({
    ...repositoryInfo,
    state: 'open',
  });
  return data;
}

// Issueを新規作成する関数
export async function createIssue(title) {
  const { data } = await octokit.rest.issues.create({
    ...repositoryInfo,
    title: title,
  });
  return data;
}

// 指定したIssueをクローズする関数
export async function closeIssue(issueNumber) {
  const { data } = await octokit.rest.issues.update({
    ...repositoryInfo,
    issue_number: Number(issueNumber),
    state: 'closed',
  });
  return data;
}
