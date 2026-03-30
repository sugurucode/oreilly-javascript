// github.js
import { Octokit } from 'octokit';

// Octokitのインスタンスとリポジトリ情報を定義
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const repositoryInfo = { owner: 'sugurucode', repo: 'oreilly-javascript' };

// 1. OpenなIssueの一覧を取得する関数
export async function listIssues() {
  const { data } = await octokit.rest.issues.listForRepo({
    ...repositoryInfo,
    state: 'open',
  });
  return data;
}

// 2. Issueを新規作成する関数
export async function createIssue(title) {
  const { data } = await octokit.rest.issues.create({
    ...repositoryInfo,
    title: title,
  });
  return data;
}

// 3. 指定したIssueをクローズする関数
export async function closeIssue(issueNumber) {
  const { data } = await octokit.rest.issues.update({
    ...repositoryInfo,
    issue_number: Number(issueNumber),
    state: 'closed',
  });
  return data;
}
