import { littleToBigEndian, bigToLittleEndian } from './index.js';

test('リトルエンディアン→ビッグエンディアン', () => {
  // 二進数だと00010010 00110100 01010110 01111000
  const arr = new Uint32Array([0x12345678]);
  const result = littleToBigEndian(arr);
  expect(Array.from(result)).toEqual([0x78563412]);
});

test('ビッグエンディアン→リトルエンディアン', () => {
  const arr = new Uint32Array([0x78563412]);
  const result = bigToLittleEndian(arr);
  expect(Array.from(result)).toEqual([0x12345678]);
});
