console.log("Hello World ~~");
// 定義一個函數來計算從 1 到給定數字 n 的總和
function sumNumbers(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// 設定最大數字
const maxNumber = 10;

// 計算總和
const totalSum = sumNumbers(maxNumber);

// 輸出結果到控制台
console.log(`The sum of numbers from 1 to ${maxNumber} is ${totalSum}`);
