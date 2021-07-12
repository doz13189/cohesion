// 制御結合（Control coupling）
// あるモジュールに何をすべきかについての情報（例えば、処理を制御するためのフラグ）を渡すことで、別のモジュール処理の流れを制御する。

const calculation = (calculationType, targetNumber) => {
  const baseNumber = 10

  if (calculationType === 'add') {
    const additionResult =  baseNumber + targetNumber
    return additionResult
  }

  if (calculationType === 'subtract') {
    const subtractionResult =  baseNumber - targetNumber
    return subtractionResult
  }

}

const result1 = calculation('add', 5)
const result2 = calculation('subtract', 5)

console.log(result1)
console.log(result2)


