import {
  beliefSystemMerge,
  isBeliefSystem,
  toBeliefSystem,
} from "../belief-system/index.js"
import { beliefMerge, isBelief, toBelief } from "../belief/index.js"
import { isNothing } from "../cell/index.js"
import { defineGeneric, defineHandler } from "../generic/index.js"
import {
  intervalContainsNumber,
  intervalEqual,
  intervalIntersect,
  intervalIsEmpty,
  isInterval,
} from "../interval/index.js"
import { coercing } from "../utils/coercing.js"
import { isNumber } from "../utils/isNumber.js"
import { log } from "../utils/log.js"
import { theMergeConflict } from "./MergeConflict.js"

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
  default(...args) {
    // no default, be explicit.
    log({
      kind: "Error",
      who: "merge",
      message: "Unhandled args.",
      args,
    })

    throw new Error(`[merge] Unhandled args.`)
  },
})

// merge 的效果是让 partial information 变得 more informative。
//
// - merge 是 lattice 的 meet。
// - implies 是 ordered set 中的 "less or equal to"。
//   虽然 "more informative" 一词中有一个 "more"，
//   但是其实就序集而言它是更小。

// 注意术语所在的领域：
//
// - merge 是就 partial information 而言的术语。
// - implies 是就命题之间的蕴含而言的术语。

// 最好用例子来理解 "more informative"：
//
// - 对集合来说，越小的集合越具体，包含的信息更多。
//   比如考虑 CLP(FD) -- Constraint Logic Programming over Finite Domains，
//   在求解 constraint 问题的过程中，domain 作为一个集合会变小。
//
// - 对于命题来说，蕴含式前项的命题比后项的命题包含更多信息。
//   因此 more informative 就是 implies。
//   集合之间的「包含于」关系，就对应于命题之间「蕴含关系」。
//
// - 对区间来说，越小的区间就更精确，就包含更多信息。
//   毕竟，区间是特殊的集合。

// 注意，对于 Belief 来说，merge 所定义的 implies，
// 与之后定义 beliefSystemMerge 时所用到的 stronger，
// 对 reasons 集合的理解方式是相反的。

export function implies<A, B>(x: A, y: B): boolean {
  return merge(x, y) === x
}

function isAnything(x: any): true {
  return true
}

defineHandler(merge, [isAnything, isNothing], (content, increment) => content)
defineHandler(merge, [isNothing, isAnything], (content, increment) => increment)

defineHandler(merge, [isNumber, isNumber], (content, increment) =>
  increment === content ? content : theMergeConflict,
)

defineHandler(merge, [isInterval, isInterval], (content, increment) => {
  const newInterval = intervalIntersect(content, increment)
  if (intervalEqual(newInterval, content)) return content
  if (intervalEqual(newInterval, increment)) return increment
  if (intervalIsEmpty(newInterval)) return theMergeConflict
  return newInterval
})

defineHandler(merge, [isNumber, isInterval], (content, increment) =>
  intervalContainsNumber(increment, content) ? content : theMergeConflict,
)

defineHandler(merge, [isInterval, isNumber], (content, increment) =>
  intervalContainsNumber(content, increment) ? increment : theMergeConflict,
)

function isPrimitive(x: any): boolean {
  return isNumber(x) || isInterval(x)
}

defineHandler(merge, [isBelief, isBelief], beliefMerge)
defineHandler(merge, [isPrimitive, isBelief], coercing(toBelief, beliefMerge))
defineHandler(merge, [isBelief, isPrimitive], coercing(toBelief, beliefMerge))

defineHandler(merge, [isBeliefSystem, isBeliefSystem], beliefSystemMerge)
defineHandler(
  merge,
  [(x) => isPrimitive(x) || isBelief(x), isBeliefSystem],
  coercing(toBeliefSystem, beliefSystemMerge),
)
defineHandler(
  merge,
  [isBeliefSystem, (x) => isPrimitive(x) || isBelief(x)],
  coercing(toBeliefSystem, beliefSystemMerge),
)
