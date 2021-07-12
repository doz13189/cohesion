# イケてないコードのイケてない理由が言語化できなかったときに確認する結合度という観点


## はじめに
以前、コードレビューをしているときに、イケてないと感じるコードを見たが、そのイケてないコードのイケてない理由が言語化できず、また、その改善方法もわからなかった。それに対してモヤモヤしながら、プリンシプル オブ プログラミングの「結合度」に関する記載を読んだときに、その時のイケてないコードのイケてない理由がわかり、言語化することもできるようになったので、結合度についてより理解を深めるため、深堀りしてみる。

凝集度についても書いている。
https://qiita.com/doz13189/items/e3bc5fd7e2c9453f6904


## 結合度とは
プリンシプル オブ プログラミングの日本語訳と wikipedia の日本語訳は異なるが、総じて意味することは一緒であり、wikipedia は気楽に引用できるため、本記事では wikipedia の言葉で統一する。
下に記載されている方が低い結合度で良いモジュールとされる。

> 内容結合（Content coupling）「高」
病理学的結合とも呼ばれ、あるモジュールが別のモジュールの内部動作によって変化したり依存したりする(例えば別のモジュールの内部データを直接参照する)。したがって、あるモジュールのデータを生成する方法（場所、種類、タイミング）を変更することは、依存するモジュールの変更につながる可能性がある。
共通結合（Common coupling）
グローバル結合とも呼ばれ、二つのモジュールが同じグローバルデータ（例えば、グローバル変数）を共有する。共通のリソースを変更すると、それを使用したすべてのモジュールを変更することを意味する。
外部結合（External coupling）
二つのモジュールは、外部から供給されたデータ·フォーマット、通信プロトコル、またはデバイスインターフェイスを共有している場合に起こる。 これは基本的に外部ツールやデバイスへの通信に関連している。
制御結合（Control coupling）
あるモジュールに何をすべきかについての情報（例えば、処理を制御するためのフラグ）を渡すことで、別のモジュール処理の流れを制御する。
スタンプ結合（Stamp coupling）
複数のモジュールが複合データ構造を共有し、その一部のみを使用する(例えば、全レコードの中の1つのフィールドを必要とする関数に全レコードのデータの構造体を渡す)。異なる部分も使用可能。これは、モジュールが必要としないフィールドが変更されることにより、モジュールのレコードを読み取る方法を変更することにつながる可能性がある。
データ結合（Data coupling）
モジュールを介してデータを共有する場合、例えば、引数である。 各データは基本部分であり、これらは単純なデータの受け渡しのみを行う（例えば、数値を渡してその平方根を返す）。
メッセージ結合（Message coupling）「低」
最も結合度が低い結合の種類である。（引数のない）メソッドの呼び出し。メッセージパッシング。
無結合（No coupling）
モジュールが相互に全く通信を行わない。

https://ja.wikipedia.org/wiki/%E7%B5%90%E5%90%88%E5%BA%A6

メッセージ結合と無結合は、プリンシプル オブ プログラミングで扱われていなかったため、それにならって本記事でも扱わない。


## 注意点
概念を深堀りすると、間違った自分流の捉え方をしてしまう可能性があるため、とても危険だと思う。ただ、ここは Qiita なので気楽に行く。

また、本記事は概念をコード化して理解を深めていくが、例えば、本記事で書いた共通結合のコード例以外にも共通結合と言えるコードはあるが、コード化してしまったがゆえにそのコード化されたものが共通結合と捉えてしまい、他の共通結合なコードを見ても、そう捉えれない、ということが考えられる。ただ、ここは Qiita なので気楽に行く。


## 内容結合（Content coupling）

> 病理学的結合とも呼ばれ、あるモジュールが別のモジュールの内部動作によって変化したり依存したりする(例えば別のモジュールの内部データを直接参照する)。したがって、あるモジュールのデータを生成する方法（場所、種類、タイミング）を変更することは、依存するモジュールの変更につながる可能性がある。

Javascript では文法上、再現できない（たぶん）。
Javascript では、ReferenceError が発生するが、内容結合ってこういうことでしょ？ということを Javascript で表現している。

`addition` モジュールが内部で定義している `baseNumber` という変数を、`multiplication` モジュールが使用しようとしている。
もし、`multiplication` モジュールが `baseNumber` を使用できれば、「別のモジュールの内部データを直接参照する」ことになり、内容結合となる。

```javascript
// ReferenceError: baseNumber is not defined

const addition = (calculatingTarget) => {
  const baseNumber = 10
  const additionResult = baseNumber + calculatingTarget
  return additionResult
}

const multiplication = (calculatingTarget) => {
  const multiplicationResult = baseNumber - calculatingTarget
  return multiplicationResult
}
```

ほとんどの言語が内容結合にあたる書き方は文法上、許されていないのではないかと思う。


## 共通結合（Common coupling）

グローバル結合とも呼ばれ、二つのモジュールが同じグローバルデータ（例えば、グローバル変数）を共有する。共通のリソースを変更すると、それを使用したすべてのモジュールを変更することを意味する。

`baseNumber` という変数を `add` モジュールからも `subtract` モジュールからも参照できる位置に定義している。

```javascript
const baseNumber = 5

const add = (targetNumber) => {
  const additionResult =  targetNumber + baseNumber
  return additionResult
}

const subtract = (targetNumber) => {
  const subtractionResult =  targetNumber - baseNumber
  return subtractionResult
}
```

これは色々と問題がある。
まず、`add` モジュールで使われている `baseNumber` がモジュールの外で定義されているため、`add` モジュールの可読性が落ちる。
次に、`baseNumber` はわりと参照しやすい場所に定義されているため、他にもたくさんのモジュールから呼ばれている可能性もある。
また、`baseNumber` の値を変更する場合に、`add` モジュールも `subtract` モジュールも影響確認をする必要がでてきてしまう。
最後に、`baseNumber` を `const` で定義しているため、再代入不可になっているが、もしこれが、`let` による再代入可となっていた場合、`baseNumber` の値が変わるため、デバッグも辛い。


## 外部結合（External coupling）

> 二つのモジュールは、外部から供給されたデータ·フォーマット、通信プロトコル、またはデバイスインターフェイスを共有している場合に起こる。これは基本的に外部ツールやデバイスへの通信に関連している。

Javascript で表現できているのか怪しいが...
`calculation` クラス内で定義している `baseNumber` という変数を `add` モジュールが使用している。

```javascript
class calculation {
  baseNumber = 5
}

const add = (targetNumber) => {
  const calculationInstance = new calculation()
  const additionResult =  targetNumber + calculationInstance.baseNumber

  return additionResult
}
```

`baseNumber` という変数は、外部のモジュールからクラスを経由して使用できるように定義しているため、`add` モジュールがとても悪いことをしているか、と言われるとそうではない。共通結合のようにわりとどこからでもアクセスできるわけではなく、`calculation` クラスをインスタンス化して使用する必要がある分、結合度は低くなっている。


## 制御結合（Control coupling）

> あるモジュールに何をすべきかについての情報（例えば、処理を制御するためのフラグ）を渡すことで、別のモジュール処理の流れを制御する。

`calculationType` という引数の値で、足し算をするのか、引き算をするのか、ということを `calculation` モジュールの処理を制御している。

```javascript
const calculation = (calculationType, targetNumber) => {
  const baseNumber = 10

  if (calculationType === 'add') {
    const additionResult =  baseNumber + targetNumber
    return additionResult
  }

  if (calculationType === 'subtract') {
    const subtractionResult =  baseNumber - targetNumber
    return subtractionResult
  }

}
```

`calculationType` という引数を呼び出し元のモジュールで扱う必要があるため、結合度が高くなっている。
`calculationType` には `add` を代入する？ `subtract` ？
掛け算のときは何を代入する？
という感じで `calculationType` という引数の扱いは面倒。

また、`calculation` モジュールの中に足し算と引き算という関連の薄い（別々のモジュールで独立しててもいい）モジュールを持つことになるため、凝集度という観点でも `calculation` モジュールは良いモジュールではない。


## スタンプ結合（Stamp coupling）

> 複数のモジュールが複合データ構造を共有し、その一部のみを使用する(例えば、全レコードの中の1つのフィールドを必要とする関数に全レコードのデータの構造体を渡す)。

これは Javascript で正しく表現できているか自信はない。
（制御結合とスタンプ結合の違いは、引数の渡し方の違いによって出る結合度の違い？？という疑問）

`calculationTypeObject` というオブジェクトを `calculation` モジュールに渡すが、処理で使用するのは一部である。

```javascript
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
```

`calculationTypeObject` というオブジェクトにすることで、制御結合ほど引数の扱いに呼び出し元モジュールが気をつける必要はなくなる分、結合度は下がっているのか、と思っている。


## データ結合（Data coupling）
> モジュールを介してデータを共有する場合、例えば、引数である。 各データは基本部分であり、これらは単純なデータの受け渡しのみを行う（例えば、数値を渡してその平方根を返す）。

`add10` モジュールに数値を渡せば、10 が足された戻り値が受け取れる、というシンプルな結合。

```javascript
const add10 = (targetNumber) => {
  const additionResult =  targetNumber + 10
  return additionResult
}

const subtract10 = (targetNumber) => {
  const subtractionResult =  targetNumber - 10
  return subtractionResult
}

const result1 = add10(10)
const result2 = subtract10(10)
```

呼び出し元モジュールは、`add10` モジュールをブラックボックスとして扱うことができ、`add10` モジュールのコードに修正が入ったとしても、「数値を渡せば、10 が足された戻り値が受け取れる」という仕様は変わらないため、影響も軽微に抑えることができる。


## まとめ
データ結合まで結合度を低くすることが理想的ではあるが、難しいケースも現場によってはあるかと思う。そういった場合は、結合度を少しでも低くすることを目標にする。


## まとめ2
サンプルコードがクソさ加減には目をつむるとしても、結合度を理解して、サンプルコードまで落とし込むのはけっこう難しいし、間違っている可能性はある。ただ、ここは Qiita なので気楽に行く。以上、終わり。
