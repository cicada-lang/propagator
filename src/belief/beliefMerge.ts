import { merge, type MergeConflict } from "../merge/index.js"
import { setIsSubsetOf, setUnion } from "../utils/set/index.js"
import { Belief } from "./Belief.js"

export function beliefMerge<A, B>(
  content: Belief<A>,
  increment: Belief<B>,
): Belief<A | B> | MergeConflict {
  const mergedValue = merge(content.value, increment.value)

  // 下面刚好是偏序关系中比较两个元素的四种可能：
  // (1) = -- a = b
  // (2) < -- a < b
  // (3) > -- a > b
  // (4) | -- a 与 b 不可比较

  if (mergedValue === content.value && mergedValue === increment.value) {
    // 当 content.value 与 increment.value 等价时，
    // 取 reasons 更小的，又当 reasons 一样大时，取 content。
    // 也就是说，当 content.value 与 increment.value 等价时，
    // 只有当 increment.reasons 真的比 content.reasons 小，才取 increment。
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
