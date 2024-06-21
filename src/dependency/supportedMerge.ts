import { implies, merge, type Contradiction } from "../merge/index.js"
import { setIsSubsetOf, setUnion } from "../utils/Set.js"
import { Supported } from "./Supported.js"

export function supportedMerge<A, B>(
  content: Supported<A>,
  increment: Supported<B>,
): Supported<A | B> | Contradiction {
  const mergedContent = merge(content.content, increment.content)

  if (mergedContent === content.content) {
    if (implies(increment, content)) {
      if (setIsSubsetOf(content.supports, increment.supports)) {
        return content
      } else {
        return increment
      }
    }

    return content
  }

  if (mergedContent === increment.content) {
    return increment
  }

  const mergedSupports = setUnion(content.supports, increment.supports)
  return Supported(mergedContent, mergedSupports)
}
