// 内容結合（Content coupling）「高」
// 病理学的結合とも呼ばれ、あるモジュールが別のモジュールの内部動作によって変化したり依存したりする(例えば別のモジュールの内部データを直接参照する)。
// したがって、あるモジュールのデータを生成する方法（場所、種類、タイミング）を変更することは、依存するモジュールの変更につながる可能性がある。


const addition = (calculatingTarget) => {
  const baseNumber = 10
  const additionResult = baseNumber + calculatingTarget
  return additionResult
}

const multiplication = (calculatingTarget) => {
  const multiplicationResult = baseNumber - calculatingTarget
  return multiplicationResult
}


const result1 = addition(1)
const result2 = multiplication(1)

console.log(result1)
console.log(result2)

// 文法上、再現できない。
// ReferenceError: baseNumber is not defined
