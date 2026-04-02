import { Polly } from '@pollyjs/core';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import FSPersister from '@pollyjs/persister-fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { listIssues, createIssue, closeIssue } from './github.js';

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('GitHub API with Polly.js', () => {
  let polly;

  beforeAll(() => {
    polly = new Polly('GitHub_API_Test', {
      // トークンがあれば実際に通信して録音(record)、なければ保存データを使用(replay)
      mode: process.env.GITHUB_TOKEN ? 'record' : 'replay',
      adapters: ['node-http'],
      persister: 'fs',
      persisterOptions: {
        fs: { recordingsDir: path.resolve(__dirname, '__recordings__') }
      },
      matchRequestsBy: {
        headers: false,
        body: false,
        order: false
      }
    });
    // Github Tokenがある場合は、Authorizationヘッダーをマスクして記録する
    // Githubに上げるとまずいので
    polly.server.any().on('beforePersist', (req, recording) => {
      if (recording.request.headers) {
        recording.request.headers = recording.request.headers.map(h => 
          // toLowerCase()でヘッダー名を小文字にして比較するのは、HTTPヘッダーは大文字小文字を区別しないため
          h.name.toLowerCase() === 'authorization' ? { ...h, value: 'GitHubトークン' } : h
        );
      }
    });
  });

  afterAll(async () => {
    await polly.stop();
  });

  test('listIssues: 実際のレスポンスを記録/再生して検証', async () => {
    const result = await listIssues();
    // レスポンスが配列である
    expect(Array.isArray(result)).toBe(true);
    // 少なくとも1件のIssueがある場合は、idプロパティが存在することを確認
    if (result.length > 0) {
      expect(result[0]).toHaveProperty('id');
    }
  });

  test('createIssue: 新規作成を記録', async () => {
    const title = 'Polly.js Test Issue';
    const result = await createIssue(title);
    expect(result.title).toBe(title);
  });

  test('closeIssue: クローズ処理を記録', async () => {
    const issueNumber = 1; 
    const result = await closeIssue(issueNumber);
    expect(result.state).toBe('closed');
  });
});
