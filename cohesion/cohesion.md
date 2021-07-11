# イケてないコードのイケてない理由が言語化できなかったときに確認する凝集度という観点

## はじめに

以前、コードレビューをしているときに、イケてないと感じるコードを見たが、そのイケてないコードのイケてない理由が言語化できず、また、その改善方法もわからなかった。それに対してモヤモヤしながら、プリンシプル オブ プログラミングの「凝集度」に関する記載を読んだときに、その時のイケてないコードのイケてない理由がわかり、言語化することもできるようになったので、凝集度についてより理解を深めるため、深堀りしてみる。

## 凝集度とは

プリンシプル オブ プログラミングの日本語訳と wikipedia の日本語訳は異なるが、総じて意味することは一緒であり、wikipedia は気楽に引用できるため、本記事では wikipedia の言葉で統一する。
下に記載されている方が高い凝集度で良いモジュールとされる。

> 偶発的凝集（Coincidental Cohesion）「最悪」  
適当（無作為）に集められたものがモジュールとなっている。モジュール内の各部分には特に関連性はない（例えば、よく使われる関数を集めたモジュールなど）。  
論理的凝集（Logical Cohesion）  
論理的に似たようなことをするものを集めたモジュール（例えば、全ての入出力ルーチンを集めたモジュールなど）。
時間的凝集（Temporal Cohesion）  
動作させたときにモジュール内の各部分が時間的に近く動作する（例えば、ある例外を受けたときに動作するルーチンとして、ファイルをクローズするルーチン、エラーログを作成するルーチン、ユーザーに通知するルーチンなどを集めたモジュール）。  
手続き的凝集（Procedural Cohesion）  
ある種の処理を行うときに動作する部分を集めたモジュール（例えば、ファイルのパーミッションをチェックするルーチンとファイルをオープンするルーチンなど）。  
通信的凝集（Communicational Cohesion）  
同じデータを扱う部分を集めたモジュール（例えば、同種のレコードの情報を操作するルーチンを集めたモジュールなど）。  
逐次的凝集（Sequential Cohesion）  
ある部分の出力が別の部分の入力となるような部分を集めたモジュール（例えば、全体としてあるファイルを読み込んで処理をするモジュール）。  
機能的凝集（Functional Cohesion）「最善」  
単一のうまく定義されたタスクを実現するモジュール（例えば、角度のサインを計算するモジュール）

https://ja.wikipedia.org/wiki/%E5%87%9D%E9%9B%86%E5%BA%A6


## 注意点

概念を深堀りすると、間違った自分流の捉え方をしてしまう可能性があるため、とても危険だと思う。
ただ、ここは Qiita なので気楽に行く。

また、本記事は概念をコード化して理解を深めていくが、例えば、本記事で書いた論理的凝集のコード例以外にも論理的凝集と言えるコードはあるが、コード化してしまったがゆえにそのコード化されたものが論理的凝集と捉えてしまい、他の論理的凝集なコードを見ても、そう捉えれない、ということが考えられる。
ただ、ここは Qiita なので気楽に行く。


## 改善前のコード

以下のクソコードを凝集度のレベルの低い方からモジュール化していき、各凝集度がどんなものを確認していく。

```javascript
const add1 = (a, b, c, d) => {
  const additionResult1 =  a + b
  const multiplicationResult1 = a * b
  const sumResult1 = additionResult1 + multiplicationResult1

  const additionResult2 =  c + d
  const multiplicationResult2 = c * d
  const sumResult2 = additionResult2 + multiplicationResult2

  return sumResult1 + sumResult2
}
```


## 偶発的凝集（Coincidental Cohesion）

> 適当（無作為）に集められたものがモジュールとなっている。モジュール内の各部分には特に関連性はない（例えば、よく使われる関数を集めたモジュールなど）。  

`add` モジュールの中に、足し算と掛け算をし、その結果を合計している処理を2箇所見つけたため、そこを切り出して `calculation` モジュールとした。

```javascript
// before
const add = (a, b, c, d) => {
  const additionResult1 =  a + b
  const multiplicationResult1 = a * b
  const sumResult1 = additionResult1 + multiplicationResult1

  const additionResult2 =  c + d
  const multiplicationResult2 = c * d
  const sumResult2 = additionResult2 + multiplicationResult2

  return sumResult1 + sumResult2
}

// after
const add = (a, b, c, d) => {
  const calculationResult1 =  calculation(a, b)
  const calculationResult2 =  calculation(c, d)

  return calculationResult1 + calculationResult2
}

const calculation = (calculatingTarget1, calculatingTarget2) => {
  const additionResult = calculatingTarget1 + calculatingTarget2
  const multiplicationResult = calculatingTarget1 * calculatingTarget2
  const sumResult = additionResult + multiplicationResult

  return sumResult
}
```

`add` モジュールの前半部分の足し算掛け算と後半部分の足し算掛け算に関連性はなく、たまたま同じ処理をしていたためモジュール化している。
前半部分も後半部分も足し算掛け算の目的が違うため、片方のみの仕様が変更される可能性があり、そうなるとモジュール化した処理が破綻する。


## 論理的凝集（Logical Cohesion）  

> 論理的に似たようなことをするものを集めたモジュール（例えば、全ての入出力ルーチンを集めたモジュールなど）。

`add` モジュールの中に、足し算と掛け算をしている処理を見つけたため、`calculation` モジュールに2つの処理をまとめて、パラメータによって足し算と掛け算を使い分けれるようにした。


```javascript
// before
const add1 = (a, b, c, d) => {
  const additionResult1 =  a + b
  const multiplicationResult1 = a * b
  const sumResult1 = additionResult1 + multiplicationResult1

  const additionResult2 =  c + d
  const multiplicationResult2 = c * d
  const sumResult2 = additionResult2 + multiplicationResult2

  return sumResult1 + sumResult2
}


// after
const add2 = (a, b, c, d) => {

  const additionResult1 =  calculation('addition', a, b)
  const multiplicationResult1 = calculation('multiplication', a, b)
  const sumResult1 = calculation('addition', additionResult1, multiplicationResult1)
  

  const additionResult2 =  calculation('addition', c, d)
  const multiplicationResult2 = calculation('multiplication', c, d)
  const sumResult2 = calculation('addition', additionResult2, multiplicationResult2)

  return sumResult1 + sumResult2
}

const calculation = (calculatingType, calculatingTarget1, calculatingTarget2) => {

  if (calculatingType === 'addition') {
    const additionResult = calculatingTarget1 + calculatingTarget2
    return additionResult
  }

  if (calculatingType === 'multiplication') {
    const multiplicationResult = calculatingTarget1 * calculatingTarget2
    return multiplicationResult
  }

}
```

足し算と掛け算を、論理的に似たようなことをするものを「計算をするモジュール」として、1つのモジュールにしている。

論理的にはまとまっているため、計算をする処理を書くときは `calculation` を呼べばいい、という風にある程度はコードにまとまりが出る。
ただ、内包されている処理同士の関連例は弱く、 `calculation` を呼んだときに、モジュール内全ての処理が実行されるわけではないため、コードの修正が発生した場合、影響箇所が不用意に広がる。また、パラメーターで制御するため、その扱いでプログラマーのミスを誘発する。


## 時間的凝集（Temporal Cohesion）  

> 動作させたときにモジュール内の各部分が時間的に近く動作する（例えば、ある例外を受けたときに動作するルーチンとして、ファイルをクローズするルーチン、エラーログを作成するルーチン、ユーザーに通知するルーチンなどを集めたモジュール）。  

時間的凝集は、before/after なし。
以下は、起動時に実行する処理をモジュール化している。

```javascript
const initial = (a, b, c, d) => {
  const additionResult1 =  a + b
  const multiplicationResult1 = a * b

  const additionResult2 =  c + d
  const multiplicationResult2 = c * d

  return { additionResult1, multiplicationResult1, additionResult2, multiplicationResult2 }
}
```

モジュールの前半部分の足し算掛け算と後半部分の足し算掛け算に関連性はないが、処理を実行する時間は同じであるため、モジュール化している。
時間という観点で凝集度は高くなっているが、前半部分と後半部分に関連性はないため、後半部分のみにコードの修正が発生することも十分に考えられる。
後半部分にコードの修正が発生した場合、ユニットテストはモジュール単位(`initial()`)なため、前半部分もテスト対象となる。影響箇所が不用意に広がっていることになる。


## 手続き的凝集（Procedural Cohesion）  

> ある種の処理を行うときに動作する部分を集めたモジュール（例えば、ファイルのパーミッションをチェックするルーチンとファイルをオープンするルーチンなど）。  

手続き的凝集は、before/after なし。
時間的凝集に順序という観点を追加したのが手続き的凝集になる。
コード例自体は変わらない。
時間的凝集は、モジュールの前半部分の足し算掛け算と後半部分の足し算掛け算に関連性はなかったが、手続き的凝集には前半部分の後に後半部分の処理を実行する、という順序という観点が追加されている。


```javascript
const process = (a, b, c, d) => {
  const additionResult1 =  a + b
  const multiplicationResult1 = a * b

  const additionResult2 =  c + d
  const multiplicationResult2 = c * d

  return { additionResult1, multiplicationResult1, additionResult2, multiplicationResult2 }
}
```

時間という観点に加えて、順序という観点が追加されているため、凝集度は高くなっている。


## 通信的凝集（Communicational Cohesion）  

> 同じデータを扱う部分を集めたモジュール（例えば、同種のレコードの情報を操作するルーチンを集めたモジュールなど）。  

通信的凝集は、before/after なし。
手続き的凝集と異なるのは、データの受け渡しをしたり、同じデータを参照する処理があること。
コード例自体は変わらない。

```javascript
const process = (a, b, c, d) => {
  const additionResult1 =  a + b
  const multiplicationResult1 = a * b
  const sumResult1 = additionResult1 + multiplicationResult1

  const additionResult2 =  c + d
  const multiplicationResult2 = c * d
  const sumResult2 = additionResult2 + multiplicationResult2

  return sumResult1 + sumResult2
}
```

データの受け渡しをしたり、同じデータを参照している分、1つのモジュールの中にあるべき理由は増えている。


## 逐次的凝集（Sequential Cohesion）  

> ある部分の出力が別の部分の入力となるような部分を集めたモジュール（例えば、全体としてあるファイルを読み込んで処理をするモジュール）。  

`add` モジュールの中に、足し算と掛け算をしている処理を見つけたため、`calculation` モジュールに2つの処理をまとめて、パラメータによって足し算と掛け算を使い分けれるようにした。
こうなると、論理的凝集と同じになるが、異なる点として、入り口点とモジュールが持っている処理の数は同じであり、今回の例であれば、`calculation` は、`addition` と `multiplication` の2つの入り口点を持っている。


```javascript
// before
const add1 = (a, b, c, d) => {
  const additionResult1 =  a + b
  const multiplicationResult1 = a * b
  const sumResult1 = additionResult1 + multiplicationResult1

  const additionResult2 =  c + d
  const multiplicationResult2 = c * d
  const sumResult2 = additionResult2 + multiplicationResult2

  return sumResult1 + sumResult2
}


// after
const add2 = (a, b, c, d) => {

  const additionResult1 =  calculation({ addition: true, multiplication: false }, a, b)
  const multiplicationResult1 = calculation({ addition: false, multiplication: true }, a, b)
  const sumResult1 = calculation({ addition: true, multiplication: false }, additionResult1, multiplicationResult1)
  
  const additionResult2 =  calculation({ addition: true, multiplication: false }, c, d)
  const multiplicationResult2 = calculation({ addition: false, multiplication: true }, c, d)
  const sumResult2 = calculation({ addition: true, multiplication: false }, additionResult2, multiplicationResult2)

  return sumResult1 + sumResult2
}


const calculation = (calculatingType, calculatingTarget1, calculatingTarget2) => {

  if (calculatingType.addition) {
    const additionResult = calculatingTarget1 + calculatingTarget2
    return additionResult
  }

  if (calculatingType.multiplication) {
    const multiplicationResult = calculatingTarget1 * calculatingTarget2
    return multiplicationResult
  }
}
```

入り口点とモジュールが持っている処理の数は同じにすることで、論理的凝集で問題となったパラメーター制御の扱いにくさを解消している。


## 機能的凝集（Functional Cohesion）「最善」  

> 単一のうまく定義されたタスクを実現するモジュール（例えば、角度のサインを計算するモジュール）

足し算、掛け算という1つの処理でモジュール化している。

```javascript
// before
const add1 = (a, b, c, d) => {
  const additionResult1 =  a + b
  const multiplicationResult1 = a * b
  const sumResult1 = additionResult1 + multiplicationResult1

  const additionResult2 =  c + d
  const multiplicationResult2 = c * d
  const sumResult2 = additionResult2 + multiplicationResult2

  return sumResult1 + sumResult2
}


// after
const add2 = (a, b, c, d) => {

  const additionResult1 =  addition(a, b)
  const multiplicationResult1 =  multiplication(a, b)
  const sumResult1 = addition(additionResult1, multiplicationResult1)

  const additionResult2 =  addition(c, d)
  const multiplicationResult2 =  multiplication(c, d)
  const sumResult2 = addition(additionResult2, multiplicationResult2)
  
  return sumResult1 + sumResult2
}

const addition = (calculatingTarget1, calculatingTarget2) => {
  const additionResult = calculatingTarget1 + calculatingTarget2
  return additionResult
}

const multiplication = (calculatingTarget1, calculatingTarget2) => {
  const multiplicationResult = calculatingTarget1 * calculatingTarget2
  return multiplicationResult
}
```

足し算をする、ということを目的に作成されたモジュールであり、その中の処理内容は足し算に関するものだけである。
そのため、このモジュールに修正が入る可能性は少ない（可能性を抑えることができる）。
また、掛け算のモジュールに修正が入っても、足し算のモジュールに影響はなく、影響範囲も最小限に留めることができている。


## まとめ

サンプルコードがクソさ加減には目をつむるとしても、凝集度を理解して、サンプルコードまで落とし込むのはけっこう難しいし、間違っている可能性はある。
ただ、ここは Qiita なので気楽に行く。以上、終わり。
