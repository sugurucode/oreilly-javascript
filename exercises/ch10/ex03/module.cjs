function greet(name) {
  return `こんにちは、${name}さん!`;
}

class Person {
  constructor(name) {
    this.name = name;
  }
  sayHello() {
    return greet(this.name);
  }
}

module.exports = { greet, Person };
