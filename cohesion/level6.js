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

  const additionResult1 =  calculation({ addition: true, multiplication: false }, a, b)
  const multiplicationResult1 = calculation({ addition: false, multiplication: true }, a, b)
  const sumResult1 = calculation({ addition: true, multiplication: false }, additionResult1, multiplicationResult1)
  
  const additionResult2 =  calculation({ addition: true, multiplication: false }, c, d)
  const multiplicationResult2 = calculation({ addition: false, multiplication: true }, c, d)
  const sumResult2 = calculation({ addition: true, multiplication: false }, additionResult2, multiplicationResult2)

  return sumResult1 + sumResult2
}


const calculation = (calculatingType, calculatingTarget1, calculatingTarget2) => {

  if (calculatingType.addition) {
    const additionResult = calculatingTarget1 + calculatingTarget2
    return additionResult
  }

  if (calculatingType.multiplication) {
    const multiplicationResult = calculatingTarget1 * calculatingTarget2
    return multiplicationResult
  }
}


const result1 = add1(1, 2, 3, 4)
const result2 = add2(1, 2, 3, 4)

console.log(result1)
console.log(result2)

// 特定のデータ構造を扱う複数の機能を1つのモジュールにまとめたもの。
// 論理的強度モジュールと情報的強度モジュールが異なる点は、入り口の数。
// 入り口点ごとに固有のパラメータがあるため、モジュールとして扱いやすい。
