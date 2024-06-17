> 实现带有 interval 的 propagator
>
> - https://github.com/cicada-lang/propagator/issues/1

`interval/` -- add some tests
`exactInterval` -- create interval from number
`generics/arithmetic` -- 支持 `Interval` 和 `Number` 之间的运算
move `generic/generic.test.ts` to `generics/arithmetic.test.ts`
add `generics/quadratic.test.ts`
barometer -- 测试带有 interval 的 propagator

> interval 支持完整的 arithmetic，包括正数与负数

`interval/` -- arithmetic 支持负数

- 可能需要 multi interval 而不是简单的 interval 了
- https://en.wikipedia.org/wiki/Interval_arithmetic

> propagator 支持 dependencies for provenance

> propagator 支持 dependencies for alternate worldviews

> propagator 支持 dependencies for implicit search

> 完成 "The Art" 中的 Heron 例子
>
> - 需要设计 lattice 来逼近结果
>   - 一个叫 近似值 的数据类型，并且为 generic 函数实现相关的 handles
