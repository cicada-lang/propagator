> propagator 支持 dependencies for provenance
>
> - https://github.com/cicada-lang/propagator/issues/2

`barometer` -- 的测试带上 `promises` -- 用论文中讲故事的方式来写测试

fix `isContradiction` for `Supported`

- `isContradiction` should be a generic

test about "a justified-intervals anomaly"

- 即 supports 的集合可能与 supported value put 进来的顺序有关

`utils/Set` -- `setIntersection` & `setDifference` -- 为了完备

> propagator 支持 dependencies for alternate worldviews
>
> - https://github.com/cicada-lang/propagator/issues/3

> propagator 支持 dependencies for implicit search
>
> - https://github.com/cicada-lang/propagator/issues/4

> 完成 "The Art" 中的 Heron 例子
>
> - 需要设计 lattice 来逼近结果
>   - 一个叫 近似值 的数据类型，并且为 generic 函数实现相关的 handles

> interval 支持完整的 arithmetic，包括正数与负数

`interval/` -- arithmetic 支持负数

- 可能需要 multi interval 而不是简单的 interval 了
  - https://en.wikipedia.org/wiki/Interval_arithmetic
- 可能 propagator 本身的分支机制就能处理 multi interval
