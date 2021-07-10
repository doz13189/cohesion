// レベル6
// 情報的強度

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

  const additionResult1 =  addition(a, b)
  const multiplicationResult1 =  multiplication(a, b)
  const sumResult1 = addition(additionResult1, multiplicationResult1)

  const additionResult2 =  addition(c, d)
  const multiplicationResult2 =  multiplication(c, d)
  const sumResult2 = addition(additionResult2, multiplicationResult2)
  
  return sumResult1 + sumResult2
}


const addition = (calculatingTarget1, calculatingTarget2) => {
  const additionResult = calculatingTarget1 + calculatingTarget2
  return additionResult
}

const multiplication = (calculatingTarget1, calculatingTarget2) => {
  const multiplicationResult = calculatingTarget1 * calculatingTarget2
  return multiplicationResult
}

const result1 = add1(1, 2, 3, 4)
const result2 = add2(1, 2, 3, 4)

console.log(result1)
console.log(result2)

// モジュール内の命令が1つの役割を実行するために関連しあっているモジュール。