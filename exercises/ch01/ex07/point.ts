class Point {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  // 引数 point の座標を自分に加算する
  add(point: Point): void {
    this.x += point.x
    this.y += point.y
  }
}

let obj1 = new Point(2, 3)
let obj2 = new Point(2, 3)

console.log(obj1)
obj1.add(obj2)
console.log(obj1) // (4,6)
