// レベル3
// 時間的強度

// after
const initial = (a, b, c, d) => {
  const additionResult1 =  a + b
  const multiplicationResult1 = a * b

  const additionResult2 =  c + d
  const multiplicationResult2 = c * d

  return { additionResult1, multiplicationResult1, additionResult2, multiplicationResult2 }
}

const { additionResult1, multiplicationResult1, additionResult2, multiplicationResult2 } = initial(1, 2, 3, 4)
console.log(additionResult1, multiplicationResult1, additionResult2, multiplicationResult2)

// 特定の時間に連続して実行うする複数の処理を1つのモジュールにまとめたもの。
// 初期処理モジュールが代表的。
