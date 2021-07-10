// レベル1
// 暗号的強度

// before
const add1 = (a, b, c, d) => {
  const additionResult1 =  a + b
  const multiplicationResult1 = a * b
  const sumResult1 = additionResult1 + multiplicationResult1

  const additionResult2 =  c + d
  const multiplicationResult2 = c * d
  const sumResult2 = additionResult2 + multiplicationResult2

  return sumResult1 + sumResult2
}


// after
const add2 = (a, b, c, d) => {
  const calculationResult1 =  calculation(a, b)
  const calculationResult2 =  calculation(c, d)

  return calculationResult1 + calculationResult2
}

const calculation = (calculatingTarget1, calculatingTarget2) => {
  const additionResult = calculatingTarget1 + calculatingTarget2
  const multiplicationResult = calculatingTarget1 * calculatingTarget2
  const sumResult = additionResult + multiplicationResult

  return sumResult
}


const result1 = add1(1, 2, 3, 4)
const result2 = add2(1, 2, 3, 4)

console.log(result1)
console.log(result2)

// 偶然に処理が一致しているのみで、共通化された処理に特別な関係はない。
// この場合、共通化された処理に対して、正しい命名はできない。
// 偶然に処理が一致しているのみで、片方のみの処理内容が変更される可能性があり、そうなると共通化した処理が破綻する。

