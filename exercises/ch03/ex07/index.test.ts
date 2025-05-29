import { equalArrays } from "./index.ts";

test("ch03-ex07", () => {
  const x = [1, 2];
  const y = { 0: 1, 1: 2, length: 2 } as unknown as number[];

  expect(equalArrays(x, y)).toBe(true);
  expect(x).not.toEqual(y);
});
