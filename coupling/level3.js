// 外部結合（External coupling）
// 二つのモジュールは、外部から供給されたデータ·フォーマット、通信プロトコル、またはデバイスインターフェイスを共有している場合に起こる。
// これは基本的に外部ツールやデバイスへの通信に関連している。


class calculation {
  baseNumber = 5
}


const add = (targetNumber) => {
  const calculationInstance = new calculation()
  const additionResult =  targetNumber + calculationInstance.baseNumber

  return additionResult
}

const result1 = add(10)

console.log(result1)


