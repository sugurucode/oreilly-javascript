function sum_new(a, b) {
  return a + b;
}

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

module.exports = { sum: sum_new, Rectangle };
