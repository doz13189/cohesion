// 制御結合（Control coupling）
// あるモジュールに何をすべきかについての情報（例えば、処理を制御するためのフラグ）を渡すことで、別のモジュール処理の流れを制御する。

// before
class calculation {
  baseNumber = 0

  constructor(baseNumber) {
    this.baseNumber = baseNumber
  }
}


const add = (targetNumber) => {
  const calculationInstance = new calculation(5)
  const additionResult =  targetNumber + calculationInstance.baseNumber

  return additionResult
}

const result1 = add(10)

console.log(result1)


// 偶然に処理が一致しているのみで、共通化された処理に特別な関係はない。
// この場合、共通化された処理に対して、正しい命名はできない。
// 偶然に処理が一致しているのみで、片方のみの処理内容が変更される可能性があり、そうなると共通化した処理が破綻する。

