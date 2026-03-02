import crypto from 'crypto';
import fs from 'fs'; // { fs } ではなく fs としてインポート
// ここを埋める

// 鍵を生成する
function generateKey() {
  // 32バイトの暗号論的疑似乱数を生成する
  // ここを埋める
  // rondomBytesは、指定したバイト数の暗号論的に安全な乱数を生成する関数
  return crypto.randomBytes(32);
}

// 平文を鍵とAES-256-CBCで暗号化する。次に、暗号文と初期化ベクトル(IV)を、Base64エンコードして返す。
function encrypt64(text, key) {
  // 16バイトの暗号論的疑似乱数を初期化ベクトル (IV) とする
  // ここを埋める
  const iv = crypto.randomBytes(16);

  // 暗号化とBase64エンコード
  // Cipherivは、指定されたアルゴリズム、鍵、および初期化ベクトルを使用して暗号化オブジェクトを作成する
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  // updateは、暗号化するデータを入力し、暗号化されたデータを出力する。
  let encrypted = cipher.update(text, 'utf8', 'base64');
  //   finalは、暗号化プロセスを完了し、残りの暗号化されたデータを出力する
  encrypted += cipher.final('base64');
  const encryptedBase64 = encrypted;

  // 暗号文とIVをbase64で返す
  return {
    value: encryptedBase64,
    iv: iv.toString('base64'),
  };
}

// generateKeyの返り値を、JSON形式でファイルに保存する(非同期)
async function writeKey(key) {
  // ここを埋める（fs.promisesで鍵を保存）
  await fs.promises.writeFile('key.json', JSON.stringify({ key: key.toString('base64') }));
}

// encrypt64の返り値を、JSON形式でファイルに保存する(非同期)
async function writeEncrypt64(data) {
  // ここを埋める（fs.promisesで暗号データを保存）
  await fs.promises.writeFile('encryptedData.json', JSON.stringify(data));
}

async function readKey() {
  // ここを埋める（return Promise<鍵>）
  const data = await fs.promises.readFile('key.json', 'utf8');
  const parsedData = JSON.parse(data);
  return Buffer.from(parsedData.key, 'base64');
}

// ファイルから暗号データを読み込む (非同期)
async function readEncrypt64() {
  // ここを埋める（return Promise<data>）
  const data = await fs.promises.readFile('encryptedData.json', 'utf8');
  return JSON.parse(data);
}

// 復号して平文を返す
function decrypt64(data, key) {
  // ここを埋める
  const iv = Buffer.from(data.iv, 'base64');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

  // data.value は既に Base64 文字列なのでそのまま update に渡す
  let decrypted = decipher.update(data.value, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// 指定の平文を暗号化とBase64エンコードし、後に復号する一連の処理
(async () => {
  // 平文
  const text = 'Hello, World!';

  // 暗号化とBase64エンコード
  const key = generateKey();
  const encryptedData = encrypt64(text, key);

  // 鍵と暗号データをJSONで保存
  await writeKey(key);
  await writeEncrypt64(encryptedData);

  console.log('Encrypted Text (Base64):', encryptedData.value);

  // Base64デコードと復号
  const storedKey = await readKey();
  const storedEncryptedData = await readEncrypt64();
  const decryptedText = decrypt64(storedEncryptedData, storedKey);

  console.log('Decrypted Text:', decryptedText);
})();
