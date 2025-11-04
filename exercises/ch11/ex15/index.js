export function modifyUrl({ base, addQuery, path }) {
  let url;
  try {
    // baseが不正なURLの場合は例外を投げる
    url = new URL(base);
  } catch (e) {
    throw new Error('Invalid base URL');
  }
  if (path) {
    // 先頭の'./'や'/'を除去し、1つだけ'/'を付与
    // ^：文字列の先頭
    // \.?：ドット（.）が0回または1回（つまり「.」があってもなくてもOK）
    // /：スラッシュ（/
    url.pathname = '/' + path.replace(/^\.?\//, '');
  }
  if (addQuery) {
    for (const [key, value] of addQuery) {
      url.searchParams.append(key, value);
    }
  }
  return url.toString();
}
