const chat = document.getElementById('chat');
const input = document.getElementById('input');
const sendBtn = document.getElementById('send');
const status = document.getElementById('status');

const messages = [];

sendBtn.addEventListener('click', async () => {
  const text = input.value.trim();
  if (!text) return;

  chat.innerHTML += `<p><b>あなた:</b> ${text}</p>`;
  input.value = '';
  messages.push({ role: 'user', content: text });

  sendBtn.disabled = true;
  status.textContent = '生成中...';

  const responseP = document.createElement('p');
  responseP.innerHTML = '<b>AI:</b> ';
  chat.appendChild(responseP);

  try {
    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'gemma:2b', messages }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = '';

    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;

      const lines = decoder.decode(value).split('\n').filter(Boolean);
      for (const line of lines) {
        const json = JSON.parse(line);
        if (json.message?.content) {
          result += json.message.content;
          responseP.innerHTML = `<b>AI:</b> ${result}`;
        }
      }
    }

    messages.push({ role: 'assistant', content: result });
    status.textContent = '';
  } catch (e) {
    status.textContent = `エラー: ${e.message}`;
  } finally {
    sendBtn.disabled = false;
  }
});

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendBtn.click();
});
