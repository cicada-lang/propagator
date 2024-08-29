import { implies, merge, type MergeConflict } from "../merge/index.js"
import { setIsSubsetOf, setUnion } from "../utils/Set.js"
import { Belief } from "./Belief.js"

export function beliefMerge<A, B>(
  content: Belief<A>,
  increment: Belief<B>,
): Belief<A | B> | MergeConflict {
  const mergedValue = merge(content.value, increment.value)

  // 这里的 cases 可以写成更对称的样子，
  // 但是这里为了效率（少调用 merge 的次数），
  // 写的不是那么对称了。

  if (mergedValue === content.value) {
    // 正向和反向的 implies 代表等价。
    if (implies(increment.value, mergedValue)) {
      // 倾向于 content，除非 increment 真的有更多信息。
      // 更小的 reason 集合，代表拥有更多的信息（更精确的依赖关系）。
      if (setIsSubsetOf(content.reason, increment.reason)) {
        return content
      } else {
        return increment
      }
    }

    return content
  }

  if (mergedValue === increment.value) {
    return increment
  }

  const mergedReason = setUnion(content.reason, increment.reason)
  return Belief(mergedValue, mergedReason)
}