// レベル5
// 連絡的強度

// after
const process = (a, b, c, d) => {
  const additionResult1 =  a + b
  const multiplicationResult1 = a * b
  const sumResult1 = additionResult1 + multiplicationResult1

  const additionResult2 =  c + d
  const multiplicationResult2 = c * d
  const sumResult2 = additionResult2 + multiplicationResult2

  return sumResult1 + sumResult2
}



// モジュール内機能間でデータの受け渡しをしたり、同じデータを参照する点。
