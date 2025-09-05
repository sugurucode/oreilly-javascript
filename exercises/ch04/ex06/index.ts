// npx tsx exercises-public/exercises/ch04/ex06/index.ts
type Params = {
  maxWidth?: number
  maxHeight?: number
}

// ifを使わない。&&と||を使う
const resize1 = (params: Params) => {
  // paramsが存在→params.maxWidthを評価
  // paramsが存在しない→falsy→600を評価
  const maxWidth = (params && params.maxWidth) || 600
  const maxHeight = (params && params.maxHeight) || 480
  console.log({ maxWidth, maxHeight })
}

// ifを使わず ? や ?? を使う
const resize2 = (params: Params) => {
  // Null合体演算子。左がnullまたはundefinedなら右を評価
  const maxWidth = params?.maxWidth ?? 600
  const maxHeight = params?.maxHeight ?? 480
  console.log({ maxWidth, maxHeight })
}

const params = {
  maxWidth: 800,
  // maxHeight: 600
}

resize1(params) // { maxWidth: 800, maxHeight: 480 }
resize2(params) // { maxWidth: 800, maxHeight: 480 }
