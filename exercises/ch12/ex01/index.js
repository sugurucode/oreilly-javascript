function counterIter(max) {
  console.log('counterIter');
  let c = 1;
  return {
    [Symbol.iterator]() {
      console.log('counterIter: Symbol.iterator');
      return this;
    },
    next() {
      console.log('counterIter: next');
      if (c >= max + 1) {
        return { value: undefined, done: true };
      }
      const value = c;
      c++;
      return { value, done: false };
    },
    return(value) {
      console.log('counterIter: return:', value);
      return { value, done: true };
    },
    throw(e) {
      console.log('counterIter: throw:', e);
      throw e;
    },
  };
}

function* counterGen(max) {
  console.log('counterGen');
  try {
    for (let c = 1; c <= max; c++) {
      console.log('counterGen: next');
      yield c;
    }
  } catch (e) {
    console.log('counterGen: catch:', e);
    throw e;
  } finally {
    console.log('counterGen: finally');
  }
}

// 明示的にイテレータnext()を呼び出す
console.log('---countIter:next()---');
const iter1 = counterIter(3);
console.log(iter1.next());
console.log(iter1.next());
console.log(iter1.next());
console.log(iter1.next());

console.log('---countIter:return()---');
// 明示的にイテレータreturn()を呼び出す
const iter2 = counterIter(3);
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.return('returned value'));
console.log(iter2.next());

console.log('---countIter:throw()---');

// 明示的にイテレータthrow()を呼び出す
const iter3 = counterIter(3);
console.log(iter3.next());
try {
  console.log(iter3.throw(new Error('test error')));
} catch (e) {
  console.log('error message:', e.message);
}
console.log(iter3.next());

// for-ofループ実行途中でbrake
console.log('---countIter:for-of---');
const iter4 = counterIter(3);
for (const v of iter4) {
  console.log('value:', v);
  if (v === 2) {
    break;
  }
}
// for-ofループ実行途中で例外発生
console.log('---countIter:for-of with error---');
const iter5 = counterIter(3);
try {
  for (const v of iter5) {
    console.log('value:', v);
    if (v === 2) {
      throw new Error('test error in for-of');
    }
  }
} catch (e) {
  console.log('error message:', e.message);
}

// ジェネレータ版
console.log('---counterGen:next()---');
const gen1 = counterGen(3);
console.log(gen1.next());
console.log(gen1.next());
console.log(gen1.next());
console.log(gen1.next());

console.log('---counterGen:return()---');
const gen2 = counterGen(3);
console.log(gen2.next());
console.log(gen2.next());
console.log(gen2.return('returned value'));
console.log(gen2.next());

console.log('---counterGen:throw()---');
const gen3 = counterGen(3);
console.log(gen3.next());
try {
  console.log(gen3.throw(new Error('test error')));
} catch (e) {
  console.log('error message:', e.message);
}
console.log(gen3.next());

// for-ofループ実行途中でbrake
console.log('---counterGen:for-of---');
const gen4 = counterGen(3);
for (const v of gen4) {
  console.log('value:', v);
  if (v === 2) {
    break;
  }
}
// for-ofループ実行途中で例外発生
console.log('---counterGen:for-of with error---');
const gen5 = counterGen(3);
try {
  for (const v of gen5) {
    console.log('value:', v);
    if (v === 2) {
      throw new Error('test error in for-of');
    }
  }
} catch (e) {
  console.log('error message:', e.message);
}
