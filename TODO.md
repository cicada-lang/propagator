# 4.4 Dependencies Improve Search

> https://github.com/cicada-lang/propagator/issues/4

恢复之前实现时忽略的 check-consistent! 和 process-nogood!

- belief-system/checkConsistent.ts

global map about about nogood

propagators/binaryAmb
propagators/oneOf
examples/multipleDwelling

用 SAT solver 来测试 binaryAmb

# docs

[docs] 总结各种 monad 的用法

# maybe

`Propagator` -- 应该是 `{ definition: PropagatorDefinition, args }`

- NOTE 这样可能会限制实现方式，导致某些 propagator 难以实现，
  需要在实现更多的 propagator 功能之后再做这个修改。
- 不应该是 nullary closure `() => MaybePromise<void>`
- 相应的 cell 中记录的不应该是 `Propagator`

`PropagatorDefinition` -- auto `constantCell`

- apply 一个 propagator 的时候，
  所有类型不是 Cell 的参数，
  都可以被自动套上一个 `constantCell`

# 完成 "The Art" 中的 Heron 例子

> - 需要设计 lattice 来逼近结果
>   - 一个叫 近似值 的数据类型，并且为 generic 函数实现相关的 handles

# interval 支持完整的 arithmetic，包括正数与负数

`interval/` -- arithmetic 支持负数

- 可能需要 multi interval 而不是简单的 interval 了
  - https://en.wikipedia.org/wiki/Interval_arithmetic
- 可能 propagator 本身的分支机制就能处理 multi interval

# later

[later] `barometer-belief.test` -- 在测试中增加书中的叙述 -- 与对 belief-system 的测试相同

[later] barometer-belief-system.test.ts -- 理解我们的测试中与书中有差异的地方

- 书中第一个测试只有：

  ```typescript
  Belief(Interval(44.51, 47.24), ["shadows", "fall-time"])
  ```

  而没有

  ```typescript
  Belief(Interval(41.16, 47.24), ["fall-time"])
  ```
