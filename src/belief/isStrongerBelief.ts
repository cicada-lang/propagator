import type { Belief } from "../belief/Belief.ts"
import { implies } from "../merge/merge.ts"
import { setIsSubsetOf } from "../utils/set/Set.ts"

// The predicate `isStrongerBelief` returns true only if the
// information contained in the second argument is deducible from that
// contained in the first.

// About stronger belief:
// - A belief has stronger value is stronger.
// - A belief has less reasons is stronger.

// 注意，下面的 isStrongerBelief 与用 merge 所定义的 implies 不同，
// merge 两个 belief 时，用的是 reasons 集合之间的并，
// 因此 implies(x, y) 对应的是 x.reasons 是 y.reasons 的超集。
// 按照 `beliefMerge` 的定义，可以获得 `Belief` 的，
// 用 `merge` 定义的 ordered set，其序关系为 `implies`，
// 这与 `isStrongerBelief` 这个需关系所定义的 `Belief` 的 ordered set 是不同的。
// 也就是说，`Belief` 这种复合 ordered set 有多种定义方式，
// 在定义 `beliefSystemMerge` 时，用到的不是 `merge` 所衍生出来的那个。

export function isStrongerBelief<A, B>(x: Belief<A>, y: Belief<B>): boolean {
  return implies(x.value, y.value) && setIsSubsetOf(x.reasons, y.reasons)
}
