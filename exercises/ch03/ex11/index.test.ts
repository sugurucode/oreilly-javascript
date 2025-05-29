import { equals } from "./index.ts";

describe("equals function", () => {
  test("should return true for strictly equal values", () => {
    expect(equals({ value: 42 }, { value: 42 })).toBe(true);
    expect(equals(null, null)).toBe(true);
  });

  test("should return false for non-object values", () => {
    expect(equals({ x: 42 }, { value: 42 })).toBe(false);
    expect(equals(null, { x: 42 })).toBe(false);
  });

  test("should return false for objects with different property names or counts", () => {
    expect(equals({ x: 1 }, { y: 1 })).toBe(false);
    expect(equals({ x: 1 }, { x: 1, y: 1 })).toBe(false);
  });

  test("should return true for deeply equal objects", () => {
    expect(equals({ x: { y: { z: 10 } } }, { x: { y: { z: 10 } } })).toBe(true);
  });

  test("should return false for deeply unequal objects", () => {
    expect(equals({ x: { y: { z: 10 } } }, { x: { y: { z: 10, w: 1 } } })).toBe(false);
  });
});
