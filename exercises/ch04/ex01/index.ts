import ComplexNumber from './type.js';

// 実部と虚部をプロパティとして持つ2つの複素数オブジェクトの足し算
export const add = (a: ComplexNumber, b: ComplexNumber): ComplexNumber => {
  return {
    real: a.real + b.real,
    imaginary: a.imaginary + b.imaginary,
  };
};

export const sub = (a: ComplexNumber, b: ComplexNumber): ComplexNumber => {
  return {
    real: a.real - b.real,
    imaginary: a.imaginary - b.imaginary,
  };
};

export const mul = (a: ComplexNumber, b: ComplexNumber): ComplexNumber => {
  return {
    real: a.real * b.real - a.imaginary * b.imaginary,
    imaginary: a.real * b.imaginary + a.imaginary * b.real,
  };
};

export const div = (a: ComplexNumber, b: ComplexNumber): ComplexNumber => {
  const bunbo = b.real * b.real + b.imaginary * b.imaginary;
  if (bunbo === 0) {
    throw new Error('除算の分母が0です');
  }
  const real = (a.real * b.real + a.imaginary * b.imaginary) / bunbo;
  const imaginary = (a.imaginary * b.real - a.real * b.imaginary) / bunbo;
  return {
    real: Math.round(real * 100) / 100,
    imaginary: Math.round(imaginary * 100) / 100,
  };
};

// Recordを使って複素数の演算を定義
export const complexOperations: Record<
  string,
  (a: ComplexNumber, b: ComplexNumber) => ComplexNumber
> = {
  add: (a, b) => add(a, b),
  sub: (a, b) => sub(a, b),
  mul: (a, b) => mul(a, b),
  div: (a, b) => div(a, b),
};

// complexOperationsの使い方
const a = { real: 2, imaginary: 3 };
const b = { real: 1, imaginary: 4 };

// 加算
const sum = complexOperations.add(a, b);
console.log(sum);

// { real: 3, imaginary: 7 }

// 文字列で動的に呼び出すことも可能
const result = complexOperations['mul'](a, b);
console.log(result);

// { real: -10, imaginary: 11 }
