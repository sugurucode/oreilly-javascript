//import { abs, sum, factorial } from "./index.js";
export {};
// TypeScript の場合は以下:
import { abs, sum, factorial } from './index';

describe('math', () => {
  describe('abs', () => {
    it('returns same value when positive value given', () => {
      expect(abs(42)).toBe(42);
    });

    it('returns negated value when negative value given', () => {
      expect(abs(-42)).toBe(42);
    });

    it('returns zero value when zero given', () => {
      expect(abs(0)).toBe(0);
    });
  });
  describe('sum', () => {
    it('return sum', () => {
      expect(sum(2, 3)).toBe(5);
    });
  });
  describe('factrial', () => {
    it('return factrial', () => {
      expect(factorial(3)).toBe(9);
    });
  });

  // 以下に sum, factorial のテストを記載せよ
});
