// レベル4
// 手順的強度

// after
const process = (a, b, c, d) => {
  const additionResult1 =  a + b
  const multiplicationResult1 = a * b

  const additionResult2 =  c + d
  const multiplicationResult2 = c * d

  return { additionResult1, multiplicationResult1, additionResult2, multiplicationResult2 }
}

const { additionResult1, multiplicationResult1, additionResult2, multiplicationResult2 } = process(1, 2, 3, 4)
console.log(additionResult1, multiplicationResult1, additionResult2, multiplicationResult2)


// 手順的強度モジュールは、問題を処理するために関係している複数個の機能のうち、いくつかを実行。
// 時間的強度に加えて、手順的な関連性があるため、強度が増している。
