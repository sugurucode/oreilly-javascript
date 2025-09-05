// 実際に使う事あるかな？可読性が悪くなる気がする
const sample = () => {
  {
    const x = 1
    console.log('1つ目のx:', x)
  }
  {
    const x = 2
    console.log('2つ目のx:', x)
  }
}
sample()
// 出力:
// 1つ目のx: 1
// 2つ目のx: 2
