// レベル2
// 論理的強度

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

  const additionResult1 =  calculation('addition', a, b)
  const multiplicationResult1 = calculation('multiplication', a, b)
  const sumResult1 = calculation('addition', additionResult1, multiplicationResult1)
  

  const additionResult2 =  calculation('addition', c, d)
  const multiplicationResult2 = calculation('multiplication', c, d)
  const sumResult2 = calculation('addition', additionResult2, multiplicationResult2)

  return sumResult1 + sumResult2
}

const calculation = (calculatingType, calculatingTarget1, calculatingTarget2) => {

  if (calculatingType === 'addition') {
    const additionResult = calculatingTarget1 + calculatingTarget2
    return additionResult
  }

  if (calculatingType === 'multiplication') {
    const multiplicationResult = calculatingTarget1 * calculatingTarget2
    return multiplicationResult
  }

}


const result1 = add1(1, 2, 3, 4)
const result2 = add2(1, 2, 3, 4)

console.log(result1)
console.log(result2)

// ある処理を抽象的に捉えてまとめたもの。関連したいくつかの処理を含んでおり、そのうち1つだけが呼び出しモジュールによって実行される。
// この例では、「計算」を抽象的に捉えてまとめている。
// モジュール内全ての処理が実行されるわけではない、内包されている処理同士の関連例は弱い。
// パラメーターで制御するため、その扱いでプログラマーのミスを誘発する。
// 論理的にはまとまっており、プログラマーの思考を集中させることはできる。


