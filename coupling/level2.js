// 共通結合（Common coupling）
// グローバル結合とも呼ばれ、二つのモジュールが同じグローバルデータ（例えば、グローバル変数）を共有する。共通のリソースを変更すると、それを使用したすべてのモジュールを変更することを意味する。

// before

const baseNumber = 5

const add = (targetNumber) => {
  const additionResult =  targetNumber + baseNumber
  return additionResult
}

const subtract = (targetNumber) => {
  const subtractionResult =  targetNumber - baseNumber
  return subtractionResult
}


const result1 = add(10)
const result2 = subtract(10)

console.log(result1)
console.log(result2)



