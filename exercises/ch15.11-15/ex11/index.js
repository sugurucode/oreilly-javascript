document.getElementById('upload').addEventListener('click', async () => {
  const token = document.getElementById('token').value.trim();
  const fileInput = document.getElementById('file');
  const statusDiv = document.getElementById('status');

  if (!token || !fileInput.files.length) {
    statusDiv.textContent = 'トークンとファイルを入力してください';
    return;
  }

  const file = fileInput.files[0];
  statusDiv.textContent = 'アップロード中...';

  try {
    const response = await fetch(
      `https://graph.microsoft.com/v1.0/me/drive/root:/${encodeURIComponent(file.name)}:/content`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': file.type || 'application/octet-stream',
        },
        body: file,
      },
    );

    if (response.ok) {
      const data = await response.json();
      statusDiv.textContent = `アップロード成功: ${data.name}`;
    } else {
      const errorData = await response.json();
      statusDiv.textContent = `エラー: ${errorData.error?.message || response.statusText}`;
    }
  } catch (error) {
    statusDiv.textContent = `エラー: ${error.message}`;
  }
});
