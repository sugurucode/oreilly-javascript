import { newHashTable } from './index.ts';

describe('newHashTable', () => {
  it('put, get, remove, sizeの基本動作(sampleを参考)', () => {
    const hashTable = newHashTable(10);
    hashTable.put('key1', 'value1');
    hashTable.put('key2', { value: 'value2' });

    expect(hashTable.size).toBe(2);
    expect(hashTable.get('key1')).toBe('value1');
    expect(hashTable.get('key2')).toEqual({ value: 'value2' });

    hashTable.put('key2', 'new value');
    expect(hashTable.get('key2')).toBe('new value');

    hashTable.remove('key2');
    expect(hashTable.get('key2')).toBeUndefined();
    expect(hashTable.size).toBe(1);
  });
});
