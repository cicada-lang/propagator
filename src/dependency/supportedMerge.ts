import { implies, merge, type Contradiction } from "../merge/index.js"
import { setIsSubsetOf, setUnion } from "../utils/Set.js"
import { Supported } from "./Supported.js"

export function supportedMerge<A, B>(
  content: Supported<A>,
  increment: Supported<B>,
): Supported<A | B> | Contradiction {
  const mergedValue = merge(content.value, increment.value)

  // 这里的 cases 可以写成更对称的样子，
  // 但是这里为了效率（少调用 merge 的次数），
  // 写的不是那么对称了。

  if (mergedValue === content.value) {
    // 正向和反向的 implies 代表等价。
    if (implies(increment.value, mergedValue)) {
      // 倾向于 content，除非 increment 真的有更多信息。
      if (setIsSubsetOf(content.supports, increment.supports)) {
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

  const mergedSupports = setUnion(content.supports, increment.supports)
  return Supported(mergedValue, mergedSupports)
}
