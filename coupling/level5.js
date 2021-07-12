// スタンプ結合（Stamp coupling）
// 複数のモジュールが複合データ構造を共有し、その一部のみを使用する(例えば、全レコードの中の1つのフィールドを必要とする関数に全レコードのデータの構造体を渡す)。
// 異なる部分も使用可能。これは、モジュールが必要としないフィールドが変更されることにより、モジュールのレコードを読み取る方法を変更することにつながる可能性がある。

const calculation = (calculationTypeObject, targetNumber) => {
  const baseNumber = 10

  if (calculationTypeObject.add) {
    const additionResult =  baseNumber + targetNumber
    return additionResult
  }

  if (calculationTypeObject.subtract) {
    const subtractionResult =  baseNumber - targetNumber
    return subtractionResult
  }

}

const result1 = calculation({ 'add': true, 'subtract': false}, 5)
const result2 = calculation({ 'add': false, 'subtract': true}, 5)

console.log(result1)
console.log(result2)


