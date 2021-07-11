// 共通結合（Common coupling）
// グローバル結合とも呼ばれ、二つのモジュールが同じグローバルデータ（例えば、グローバル変数）を共有する。共通のリソースを変更すると、それを使用したすべてのモジュールを変更することを意味する。


// レベル1
// 暗号的強度

// before

const baseNumber = 5

const add = (targetNumber) => {
  const additionResult =  targetNumber + baseNumber
  return additionResult
}

const subtract = (targetNumber) => {
  const subtractionResult =  targetNumber + baseNumber
  return subtraction
}


const result1 = add(10)
const result2 = subtract(10)

console.log(result1)
console.log(result2)

// 偶然に処理が一致しているのみで、共通化された処理に特別な関係はない。
// この場合、共通化された処理に対して、正しい命名はできない。
// 偶然に処理が一致しているのみで、片方のみの処理内容が変更される可能性があり、そうなると共通化した処理が破綻する。

