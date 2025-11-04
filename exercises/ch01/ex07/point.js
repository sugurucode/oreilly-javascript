"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    // 引数 point の座標を自分に加算する
    Point.prototype.add = function (point) {
        this.x += point.x;
        this.y += point.y;
    };
    return Point;
}());
var obj1 = new Point(2, 3);
var obj2 = new Point(2, 3);
console.log(obj1);
obj1.add(obj2);
console.log(obj2); // (4,6)
