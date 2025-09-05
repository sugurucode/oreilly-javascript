import { counterGroup } from './index.js';

test('カウンターのカウントとリセットができる', () => {
  const group = counterGroup();
  const c = group.newCounter();
  expect(c.count()).toBe(0);
  expect(c.count()).toBe(1);
  c.reset();
  expect(c.count()).toBe(0);
});

test('複数カウンターが独立している', () => {
  const group = counterGroup();
  const c1 = group.newCounter();
  const c2 = group.newCounter();
  c1.count();
  c1.count();
  c2.count();
  expect(c1.getCount()).toBe(2);
  expect(c2.getCount()).toBe(1);
});
