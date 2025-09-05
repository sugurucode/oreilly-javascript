describe('同値テスト', () => {
  it('💯の値を確認', () => {
    const emoji = '💯'
    console.log('emojiの長さ', emoji.length)

    expect(emoji.length).toBe(2)
  })

  it('utf-16,utf32,💯の同値確認', () => {
    const emoji = '💯'
    const utf16 = '\uD83D\uDCA9' // UTF-16エンコード
    const utf32 = '\u{1F4AF}' // UTF-32エンコード

    console.log(utf16) // 💩
    console.log(utf32) // 💯

    expect(emoji.length).toBe(utf16.length)
    expect(emoji.length).toBe(utf32.length)
  })
})
