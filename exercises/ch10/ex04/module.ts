export default function greet(name: string): string {
  return `こんにちは、${name}さん!`;
}

export class Person {
  constructor(public name: string) {}
  sayHello() {
    return greet(this.name);
  }
}
