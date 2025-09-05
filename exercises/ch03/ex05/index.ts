export const transport_crlf = (text: string): string => {
  // globalオプション。文字列全体を置換
  return text.replace(/\n/g, '\r\n')
}

export const transport_lf = (text: string): string => {
  // globalオプション。文字列全体を置換
  return text.replace(/\r\n/g, '\n')
}
