import {jest} from '@jest/globals'; // 🌟 これを一番上に追加！
import {listIssues, createIssue, closeIssue} from './github.js';
import {Polly} from '@pollyjs/core';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import FetchAdapter from '@pollyjs/adapter-fetch';
import FSPersister from '@pollyjs/persister-fs';

Polly.register(NodeHttpAdapter);
Polly.register(FetchAdapter);
Polly.register(FSPersister);

describe('Polly.JS を利用したテスト', () => {
  // これで jest が認識されるようになります！
  jest.setTimeout(30000);

  let polly;
  let createdIssueNumber;

  beforeEach(() => {
    polly = new Polly('github-api-test', {
      adapters: ['node-http', 'fetch'],
      persister: 'fs',
      persisterOptions: {
        fs: {
          recordingsDir: '__recordings__',
        },
      },
      recordIfMissing: true,
      matchRequestsBy: {
        headers: {
          exclude: ['authorization'],
        },
      },
    });
  });

  afterEach(async () => {
    await polly.flush();
    await polly.stop();
  });

  test('listIssues: 実際のAPIと通信して一覧を取得する', async () => {
    const issues = await listIssues();
    expect(Array.isArray(issues)).toBe(true);
  });

  test('createIssue: 新規Issueを作成する', async () => {
    const issue = await createIssue('Polly Test Issue');
    expect(issue.title).toBe('Polly Test Issue');

    createdIssueNumber = issue.number;
  });

  test('closeIssue: 作成したIssueをクローズする', async () => {
    const targetNumber = createdIssueNumber || 1;
    const issue = await closeIssue(targetNumber);

    expect(issue.state).toBe('closed');
  });
});
