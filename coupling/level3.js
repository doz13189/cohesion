// 外部結合（External coupling）
// 二つのモジュールは、外部から供給されたデータ·フォーマット、通信プロトコル、またはデバイスインターフェイスを共有している場合に起こる。 これは基本的に外部ツールやデバイスへの通信に関連している。

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

