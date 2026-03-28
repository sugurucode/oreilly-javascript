## ESlintの導入手順

1. 'https://eslint.org/'
   バージョン8を入れる

```
npm install --save-dev eslint@8
```

## pretiierの導入手順

1.`https://prettier.io/docs/install`

```bash
suguru@A081003065:~/oreilly_javascript7_fix/exercises-public/exercises/ch17$ npm install --save-dev --save-exact prettier

added 1 package in 5m

61 packages are looking for funding
  run `npm fund` for details
```

## 課題達成手順

1. npm run lint

- 実行結果

```bash
/home/suguru/oreilly_javascript7_fix/exercises-public/exercises/ch17/ex01/format_sample.js
    3:10  error  'sample' is defined but never used                        no-unused-vars
    3:10  error  'sample' is defined but never used                        @typescript-eslint/no-unused-vars
    4:3   error  Unexpected var, use let or const instead                  no-var
    4:7   error  'a' is assigned a value but never used                    no-unused-vars
    4:7   error  'a' is assigned a value but never used                    @typescript-eslint/no-unused-vars
    5:12  error  'spaces' is assigned a value but never used               no-unused-vars
    5:12  error  'spaces' is assigned a value but never used               @typescript-eslint/no-unused-vars
    6:7   error  'disallowedObj' is never reassigned. Use 'const' instead  prefer-const
    6:7   error  'disallowedObj' is assigned a value but never used        no-unused-vars
    6:7   error  'disallowedObj' is assigned a value but never used        @typescript-eslint/no-unused-vars
   13:7   error  'jsx' is never reassigned. Use 'const' instead            prefer-const
   13:7   error  'jsx' is assigned a value but never used                  no-unused-vars
   13:7   error  'jsx' is assigned a value but never used                  @typescript-eslint/no-unused-vars
   25:5   error  'someVeryLongCondition' is not defined                    no-undef
   26:3   error  Expected { after 'if' condition                           curly
   26:3   error  'doSomething' is not defined                              no-undef
   28:21  error  'foo' is not defined                                      no-undef
   28:38  error  Expected { after 'for' condition                          curly
   28:38  error  'bar' is not defined                                      no-undef
   28:42  error  'foo' is not defined                                      no-undef
   32:7   error  'InnerClass' is defined but never used                    no-unused-vars
   32:7   error  'InnerClass' is defined but never used                    @typescript-eslint/no-unused-vars
   37:9   error  'condition' is not defined                                no-undef
   39:9   error  'something' is not defined                                no-undef
   42:9   error  'recover' is not defined                                  no-undef
   49:10  error  'doNothing' is defined but never used                     no-unused-vars
   49:10  error  'doNothing' is defined but never used                     @typescript-eslint/no-unused-vars
   52:5   error  'condition' is not defined                                no-undef
   54:12  error  'otherCondition' is not defined                           no-undef
   54:28  error  Empty block statement                                     no-empty
   60:13  error  Empty block statement                                     no-empty
   65:7   error  'InnerClass' is already defined                           no-redeclare
   68:9   error  'foo' is defined but never used                           no-unused-vars
   68:9   error  'foo' is defined but never used                           @typescript-eslint/no-unused-vars
   84:1   error  'someMethod' is not defined                               no-undef
   84:12  error  'foo' is not defined                                      no-undef
   86:4   error  'bar' is not defined                                      no-undef
   89:7   error  'a' is already defined                                    no-redeclare
   89:7   error  'a' is assigned a value but never used                    no-unused-vars
   89:7   error  'a' is assigned a value but never used                    @typescript-eslint/no-unused-vars
   94:7   error  'b' is already defined                                    no-redeclare
   94:7   error  'b' is assigned a value but never used                    no-unused-vars
   94:7   error  'b' is assigned a value but never used                    @typescript-eslint/no-unused-vars
   96:7   error  'c' is already defined                                    no-redeclare
   96:7   error  'c' is assigned a value but never used                    no-unused-vars
   96:7   error  'c' is assigned a value but never used                    @typescript-eslint/no-unused-vars
   98:1   error  'someMethod' is not defined                               no-undef
   98:12  error  'foo' is not defined                                      no-undef
  100:4   error  'bar' is not defined                                      no-undef
  138:1   error  'prefix' is not defined                                   no-undef
  142:6   error  'someOtherLongFunctionName' is not defined                no-undef
  144:6   error  'andNowForSomethingCompletelyDifferent' is not defined    no-undef
  148:1   error  'some' is not defined                                     no-undef
  148:29  error  'arg1' is not defined                                     no-undef
  148:35  error  'arg2' is not defined                                     no-undef
  148:41  error  'arg3' is not defined                                     no-undef

/home/suguru/oreilly_javascript7_fix/exercises-public/exercises/ch17/ex01/lint_sample.js
  4:1   error  Unexpected use of 'with' statement  no-with
  5:7   error  'PI' is not defined                 no-undef
  6:11  error  'cos' is not defined                no-undef
  6:15  error  'PI' is not defined                 no-undef
  7:11  error  'sin' is not defined                no-undef
  7:15  error  'PI' is not defined                 no-undef

・・・・（省略）・・・・

```

「`format_sample.js は lint の警告を修正するのではなく、ESLint の設定で lint 対象から除外`」の要件を満たす必要があるが、`format_sample.js`の警告が出ているので`.eslintegnore`で`ex01/format_sample.js`を除外設定。

`npx eslint ex01/lint_sample.js --fix`で修正出来なかったので手動で消えるまで修正。

```bash
suguru@A081003065:~/oreilly_javascript7_fix/exercises-public/exercises/ch17$ npx eslint ex01/lint_sample.js --fix
=============

WARNING: You are currently running a version of TypeScript which is not officially supported by @typescript-eslint/typescript-estree.

You may find that it works just fine, or you may not.

SUPPORTED TYPESCRIPT VERSIONS: >=4.3.5 <5.4.0

YOUR TYPESCRIPT VERSION: 5.8.3

Please only submit bug reports when using the officially supported version.

=============

/home/suguru/oreilly_javascript7_fix/exercises-public/exercises/ch17/ex01/lint_sample.js
  4:1   error  Unexpected use of 'with' statement  no-with
  5:7   error  'PI' is not defined                 no-undef
  6:11  error  'cos' is not defined                no-undef
  6:15  error  'PI' is not defined                 no-undef
  7:11  error  'sin' is not defined                no-undef
  7:15  error  'PI' is not defined                 no-undef

✖ 6 problems (6 errors, 0 warnings)
```

以上
