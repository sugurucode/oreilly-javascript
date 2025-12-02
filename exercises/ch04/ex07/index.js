"use strict";
// 危険な関数例
function set42(key) {
    eval(`${key} = 42;`);
}
let a;
// 悪用例: 意図しないコード実行(chat-gptの回答を参考にしています)
// 無限ループを発生させ、システムに負荷を与えます
//set42('while(true){} //')
// ブラウザ環境でアラートを表示。
//set42('alert("hacked") //')
// "hacked"と出力。
set42('console.log("hacked") //');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsU0FBUztBQUNULFNBQVMsS0FBSyxDQUFDLEdBQUc7SUFDaEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsQ0FBQTtBQUN0QixDQUFDO0FBRUQsSUFBSSxDQUFDLENBQUE7QUFDTCx3Q0FBd0M7QUFDeEMsMEJBQTBCO0FBQzFCLDJCQUEyQjtBQUUzQixrQkFBa0I7QUFDbEIsNkJBQTZCO0FBRTdCLGVBQWU7QUFDZixLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQSJ9