"use strict";
// ...existing code...
// try-catch-finally の実行順序が確認できるサンプル
// npx tsx exercises-public/exercises/ch05/ex06/index.ts
const showTryCatchFinallyOrder = () => {
    console.log('1:tryの上');
    try {
        console.log('2:tryブロックの中');
        throw new Error('エラーが発生しました');
    }
    catch (e) {
        console.log('3:catchブロック');
    }
    finally {
        console.log('4:finallyブロック');
    }
    console.log('5: try-catch-finallyの外');
};
showTryCatchFinallyOrder();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0JBQXNCO0FBQ3RCLG9DQUFvQztBQUNwQyx3REFBd0Q7QUFDeEQsTUFBTSx3QkFBd0IsR0FBRyxHQUFHLEVBQUU7SUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2QixJQUFJLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzdCLENBQUM7WUFBUyxDQUFDO1FBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQ3hDLENBQUMsQ0FBQztBQUVGLHdCQUF3QixFQUFFLENBQUMifQ==