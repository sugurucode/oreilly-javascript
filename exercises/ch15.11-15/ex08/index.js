// WebSocketサーバーへの接続
const socket = new WebSocket('ws://localhost:3003');

// リクエストごとの状態を管理するためのMap
// Key: requestId, Value: { responseElement: HTMLElement, timeoutId: number }
const pendingRequests = new Map();

// 接続が開かれたときの処理
socket.addEventListener('open', () => {
  console.log('Connected to server');
});

// メッセージを受信したときの処理
socket.addEventListener('message', (event) => {
  try {
    const message = JSON.parse(event.data);
    const { requestId, type, payload } = message;

    // 管理中のリクエストか確認（タイムアウト済みなら存在しない）
    if (!pendingRequests.has(requestId)) {
      return;
    }

    const requestState = pendingRequests.get(requestId);
    const { responseElement, timeoutId } = requestState;

    // 正常に受信できたのでタイムアウトタイマーを解除
    clearTimeout(timeoutId);
    pendingRequests.delete(requestId);

    // レスポンスタイプに応じた表示処理
    if (type === 'response') {
      responseElement.textContent = payload;
    } else if (type === 'error') {
      responseElement.textContent = `Error: ${payload}`;
    } else {
      // 予期せぬタイプの場合
      responseElement.textContent = `Error: Unexpected message type ${type}`;
    }
  } catch (e) {
    console.error('Failed to process message', e);
  }
});

// 接続が切断されたときの処理
socket.addEventListener('close', () => {
  console.log('Connection closed');
  // レスポンス待ちのリクエスト全てにエラーを表示
  pendingRequests.forEach((state) => {
    clearTimeout(state.timeoutId);
    state.responseElement.textContent = 'Error: Connection Closed';
  });
  pendingRequests.clear();
});

// フォーム送信時の処理
document.getElementById('requests').addEventListener('submit', (e) => {
  e.preventDefault(); // フォームのデフォルト送信（リロード）をキャンセル

  // WebSocketが接続されていない場合は処理しない
  if (socket.readyState !== WebSocket.OPEN) {
    alert('WebSocket is not connected.');
    return;
  }

  // リクエスト1〜3を処理
  const requestIndices = [1, 2, 3];

  requestIndices.forEach((index) => {
    const inputId = `payload${index}`;
    const responseId = `response${index}`;

    const inputElement = document.getElementById(inputId);
    const responseElement = document.getElementById(responseId);

    // 入力値の取得
    const payload = inputElement.value;

    // "Loading..." を表示
    responseElement.textContent = 'Loading...';

    // ユニークなrequestIdを生成 (現在時刻 + インデックス)
    // ※数値型である必要があるためDate.now()を使用
    const requestId = Date.now() + index;

    // 3秒のタイムアウト設定
    const timeoutId = setTimeout(() => {
      // タイムアウト発生時の処理
      if (pendingRequests.has(requestId)) {
        responseElement.textContent = 'Error: Request timed out';
        pendingRequests.delete(requestId);
      }
    }, 3000);

    // 管理Mapに保存
    pendingRequests.set(requestId, {
      responseElement,
      timeoutId,
    });

    // リクエストメッセージの送信
    const requestMessage = {
      requestId: requestId,
      type: 'request',
      payload: payload,
    };

    socket.send(JSON.stringify(requestMessage));
  });
});
