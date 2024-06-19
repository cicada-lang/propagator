import { isNothing } from "../cell/index.js"
import { defineGeneric, defineHandler } from "../generic/index.js"
import {
  intervalContainsNumber,
  intervalEqual,
  intervalIntersect,
  intervalIsEmpty,
  isInterval,
} from "../interval/index.js"
import { isNumber } from "../utils/isNumber.js"
import { theContradiction } from "./Contradiction.js"

// # The contract of `merge`
// The contract of the generic function merge is that it takes two
// arguments the currently known information and the new information
// being supplied, and returns the new aggregate information.  If the
// information being supplied is redundant, the merge function should
// return exactly (by eq?)  the original information, so that the cell
// can know that the news was redundant and not alert its neighbors.
// If the new information contradicts the old information, merge
// should return a distinguished value indicating the contradiction,
// so that the cell can signal an error. For symmetry and future use,
// if the new information strictly supersedes the old (i.e., if the
// old information would be redundant given the new, but the new is
// not redundant given the old) merge is expected to return exactly
// (by eq?) the new information.

// # `merge` is not entirely symmetric
// If the first and second arguments represent equivalent information
// but are not eq?, merge must return the first rather than the
// second. This is a consequence of the asymmetry in the cells’
// treatment of their existing content versus incoming content. Having
// merge return the wrong one could lead to spurious infinite loops.

export const merge = defineGeneric({
  default: (content, increment) =>
    increment === content ? content : theContradiction,
})

function isAnything(x: any): true {
  return true
}

defineHandler(merge, [isAnything, isNothing], (content, increment) => content)
defineHandler(merge, [isNothing, isAnything], (content, increment) => increment)

defineHandler(merge, [isInterval, isInterval], (content, increment) => {
  const newInterval = intervalIntersect(content, increment)
  if (intervalEqual(newInterval, content)) return content
  if (intervalEqual(newInterval, increment)) return increment
  if (intervalIsEmpty(newInterval)) return theContradiction
  return newInterval
})

defineHandler(merge, [isInterval, isNumber], (content, increment) =>
  intervalContainsNumber(content, increment) ? increment : theContradiction,
)

defineHandler(merge, [isNumber, isInterval], (content, increment) =>
  intervalContainsNumber(increment, content) ? content : theContradiction,
)
