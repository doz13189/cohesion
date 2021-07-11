// スタンプ結合（Stamp coupling）
// 複数のモジュールが複合データ構造を共有し、その一部のみを使用する(例えば、全レコードの中の1つのフィールドを必要とする関数に全レコードのデータの構造体を渡す)。異なる部分も使用可能。これは、モジュールが必要としないフィールドが変更されることにより、モジュールのレコードを読み取る方法を変更することにつながる可能性がある。

// before

const add = (targetNumber1, targetNumber2) => {
  const additionResult =  targetNumber1 + targetNumber2
  return additionResult
}

const subtract = (targetNumber1, targetNumber2, targetNumber3) => {
  const subtractionResult =  targetNumber1 - targetNumber2
  return subtractionResult
}


const result1 = add(5, 10)
const result2 = subtract(result1, 10, 6)

console.log(result1)
console.log(result2)



