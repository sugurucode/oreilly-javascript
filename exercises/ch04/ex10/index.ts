const ricoh = ['r', 'i', 'c', 'o', 'h']

delete ricoh[3]

console.log(ricoh) // ['r', 'i', 'c', <1 empty item>, 'h']

console.log(ricoh.length) //5

// deleteは要素を削除するが、lengthは変わらない

//--------------------------------------------------------

// 要素を削除してlengthを変えたい場合は、spliceを使う
const ricoh2 = ['r', 'i', 'c', 'o', 'h']
// 3番目から1つ削除
ricoh2.splice(3, 1)
console.log(ricoh2)
console.log(ricoh2.length) //4
