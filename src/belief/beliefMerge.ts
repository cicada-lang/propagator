import { merge } from "../merge/index.ts"
import { setIsSubsetOf, setUnion } from "../utils/set/index.ts"
import { Belief } from "./Belief.ts"

// The important thing is to describe how to merge the information
// contained in two such data structures; The value contained in the
// answer must of course be the merge of the values contained in the
// two inputs, but sometimes we may get away with using only some of
// the supporting premises.

// There are three cases:
//
// - if neither the new nor the old values are redundant, then we need
//   both their supports;
//
// - if either is strictly redundant, we needn’t include its support;
//
// - and if they are equivalent, we can choose which support to
//   use. In this case, we use the support of the value already
//   present unless the support of the new one is strictly more
//   informative (i.e., is a strict subset of the same premises).

export function beliefMerge<A>(
  content: Belief<A>,
  increment: Belief<A>,
): Belief<A> {
  const mergedValue = merge(content.value, increment.value)

  // 下面刚好是偏序关系中比较两个元素的四种可能：
  // (1) = -- a = b
  // (2) < -- a < b
  // (3) > -- a > b
  // (4) | -- a 与 b 不可比较

  if (mergedValue === content.value && mergedValue === increment.value) {
    // - 当 content.value 与 increment.value 相等时，取 reasons 更小的；
    // - 当 reasons 也相等时，取 content。

    // 也就是说，当 content.value 与 increment.value 等价时，
    // 只有当 increment.reasons 真的比 content.reasons 小，才取 increment。

    // 注意，这种取 subset 的行为等价于取 intersection，
    // 与下面取 union 的行为，在 lattice 的意义上是相互对偶的：
    // - 在 value 相等时用 intersection，就是用 set lattice。
    // - 在 value 可比较时，直接取较小 value 的 reasons。
    // - 在不可比较时用 union，就是用 dual set lattice。
    // 和 dependent type 类似，这里是 dependent record，
    // 即后项所取的 lattice 种类，取决于前项的值是否相等。

    if (setIsSubsetOf(content.reasons, increment.reasons)) {
      return content
    } else {
      return increment
    }
  }

  if (mergedValue === increment.value) {
    return increment
  }

  if (mergedValue === content.value) {
    return content
  }

  return Belief(mergedValue, setUnion(content.reasons, increment.reasons))
}
