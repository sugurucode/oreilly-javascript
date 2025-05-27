export const comparisonEquality = (a:number,b:number):boolean=>{
    if(a===b){
        return true;
    }
    return false;
}

console.log('比較演算子 === の結果:', comparisonEquality(0.3-0.2, 0.1)); // false????
console.log(0.3-0.2); //0.09999999999999998


export const comparisonEqualityWithEpsilon = (a:number,b:number):boolean=>{
    const epsilon = 1e-10; // 許容誤差
    // a-bの絶対値が1e-10未満ならば等しいとみなす
    if(Math.abs(a - b) < epsilon){
        return true;
    }
    return false;
}

console.log('比較演算子 === の結果:', comparisonEqualityWithEpsilon(0.3-0.2, 0.1));
