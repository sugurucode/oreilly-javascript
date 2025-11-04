1. 明示的にイテレータプロトコルの next() を呼び出す

```ts
counterIter
counterIter: next
{ value: 1, done: false }
counterIter: next
{ value: 2, done: false }
counterIter: next
{ value: 3, done: false }
counterIter: next
{ value: undefined, done: true }
```

2. 1. 明示的にイテレータプロトコルの return() を呼び出す

```ts
counterIter
counterIter: next
{ value: 1, done: false }
counterIter: next
{ value: 2, done: false }
counterIter: return: returned value
{ value: 'returned value', done: true }
counterIter: next
{ value: 3, done: false }
```

3. 明示的にイテレータプロトコルの return() を呼び出す

```ts
counterIter
counterIter: next
{ value: 1, done: false }
counterIter: next
{ value: 2, done: false }
counterIter: return: returned value
{ value: 'returned value', done: true }
counterIter: next
{ value: 3, done: false }
```

4. for-ofループ実行途中でbrake

```ts
counterIter
counterIter: Symbol.iterator
counterIter: next
value: 1
counterIter: next
value: 2
counterIter: return: undefined
```

5. for-ofループ実行途中で例外

```ts
counterIter
counterIter: Symbol.iterator
counterIter: next
value: 1
counterIter: next
value: 2
counterIter: return: undefined
error message: test error in for-of
```

6. 明示的にnext()

```ts
counterGen
counterGen: next
{ value: 1, done: false }
counterGen: next
{ value: 2, done: false }
counterGen: next
{ value: 3, done: false }
counterGen: finally
{ value: undefined, done: true }
```

7. 明示的にreturn

```ts
counterGen
counterGen: next
{ value: 1, done: false }
counterGen: next
{ value: 2, done: false }
counterGen: finally
{ value: 'returned value', done: true }
{ value: undefined, done: true }
```

8. 明示的にthorw()

```ts
counterGen
counterGen: next
{ value: 1, done: false }
counterGen: catch: Error: test error
    at <anonymous> (/home/suguru/oreilly_javascript7_fix/exercises-public/exercises/ch12/ex01/index.ts:114:26)
    at ModuleJob.run (node:internal/modules/esm/module_job:271:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:578:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:116:5)
counterGen: finally
error message: test error
{ value: undefined, done: true }
```

9. for-of途中でbrake

```ts
counterGen
counterGen: next
value: 1
counterGen: next
value: 2
counterGen: finally
```

10. for-of途中でエラー

```ts
counterGen
counterGen: next
value: 1
counterGen: next
value: 2
counterGen: finally
error message: test error in for-of
```
