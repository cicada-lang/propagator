[refactoring] extract `merge-number`
[refactoring] extract `merge-nothing`

[refactoring] extract `implies`

[refactoring] should not define handlers of `merge` in one file

- register imports in `merge/index.ts`

[refactoring] should not define handlers of `detectMergeConflict` in one file

- register imports in `merge/index.ts`

[note] 修复 lattice 笔记中关于 propagator 的各种错误

- "more information" 代表 <=，而不是 >= （书中也错了）。
- Number <= Interval <= Belief <= BeliefSystem 是错误的。

# propagator 支持 dependencies for alternate worldviews

> - https://github.com/cicada-lang/propagator/issues/3

`beliefSystemQuery` -- 如果可以的话，避免使用全局变量

barometer-belief-system.test.ts -- finial version

barometer-belief-system.test.ts -- 理解我们的测试中与书中有差异的地方

- 书中第一个测试只有：

  ```typescript
  Belief(Interval(44.51, 47.24), ["shadows", "fall-time"])
  ```

  而没有

  ```typescript
  Belief(Interval(41.16, 47.24), ["fall-time"])
  ```

# propagator 支持 dependencies for implicit search

> - https://github.com/cicada-lang/propagator/issues/4

# 完成 "The Art" 中的 Heron 例子

> - 需要设计 lattice 来逼近结果
>   - 一个叫 近似值 的数据类型，并且为 generic 函数实现相关的 handles

# interval 支持完整的 arithmetic，包括正数与负数

`interval/` -- arithmetic 支持负数

- 可能需要 multi interval 而不是简单的 interval 了
  - https://en.wikipedia.org/wiki/Interval_arithmetic
- 可能 propagator 本身的分支机制就能处理 multi interval

# maybe

[maybe] propagator 不应该是 nullary closure，
应该是函数本身，运行的时候提供参数给函数。
