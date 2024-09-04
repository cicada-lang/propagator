import { Belief } from "../belief/index.js"
import { implies, merge, type MergeConflict } from "../merge/index.js"
import { isNothing, nothing, type Nothing } from "../nothing/index.js"
import type { Reasons } from "../reason/index.js"
import { setIsSubsetOf } from "../utils/set/index.js"
import { BeliefSystem } from "./BeliefSystem.js"

// Asking the belief system to deduce all the consequences of all its
// beliefs all the time is perhaps a bad idea, so when we merge belief
// systems we assimilate the beliefs from the incoming one into the
// current one, and then deduce only those consequences that are
// relevant to the current worldview.

export function beliefSystemMerge<A, B>(
  content: BeliefSystem<A>,
  increment: BeliefSystem<B>,
): BeliefSystem<A | B> | MergeConflict {
  const candidate = assimilate(content, increment)
  const consequence = strongest(candidate.beliefs)
  return assimilateOne(candidate, consequence)
}

// The procedure `assimilate` incorporates all the given items, one by
// one, into the given belief system with no deduction of
// consequences.

function assimilate<A, B>(
  base: BeliefSystem<A>,
  target: BeliefSystem<B> | Nothing,
): BeliefSystem<A | B> {
  if (isNothing(target)) {
    return base
  }

  return target.beliefs.reduce<BeliefSystem<A | B>>(
    (result, belief) => assimilateOne(result, belief),
    base,
  )
}

function assimilateOne<A, B>(
  base: BeliefSystem<A>,
  belief: Belief<B> | Nothing,
): BeliefSystem<A | B> {
  if (isNothing(belief)) {
    return base
  }

  // When we add a new belief to an existing belief system we check
  // whether the information contained in the new belief is deducible
  // from that in some beliefs already in the belief system. If so, we
  // can just throw the new one away.

  if (base.beliefs.some((oldBelief) => isStronger(oldBelief, belief))) {
    return base
  }

  // Conversely, if the information in any existing belief is
  // deducible from the information in the new one, we can throw those
  // existing ones away.

  // 注意，对于偏序关系来说，
  // not(lteq(x, y)) 不等于 lteq(y, x)，
  // 前者还包含了偏序关系中不可比较的情况。

  const strongerOldBeliefs = base.beliefs.filter(
    (oldBelief) => !isStronger(belief, oldBelief),
  )

  return BeliefSystem<A | B>([...strongerOldBeliefs, belief])
}

// The predicate `isStronger` returns true only if the information
// contained in the second argument is deducible from that contained
// in the first.

// About stronger belief:
// - A belief has stronger value is stronger.
// - A belief has less reasons is stronger.

// 注意，下面的 isStronger 与用 merge 所定义的 implies 不同，
// merge 两个 belief 时，用的是 reasons 集合之间的并，
// 因此 implies(x, y) 对应的是 x.reasons 是 y.reasons 的超集。

// 按照 `beliefMerge` 的定义，可以获得 `Belief` 的，
// 用 `merge` 定义的 ordered set，其序关系为 `implies`，
// 这与 `isStronger` 这个需关系所定义的 `Belief` 的 ordered set 是不同的。

// 也就是说，`Belief` 这种复合 ordered set 有多种定义方式，
// 在定义 `beliefSystemMerge` 时，用到的不是 `merge` 所衍生出来的那个。

function isStronger<A, B>(x: Belief<A>, y: Belief<B>): boolean {
  return implies(x.value, y.value) && setIsSubsetOf(x.reasons, y.reasons)
}

// The procedure `strongest` finds the most informative consequence
// of the current worldview. It does this by using merge to combine
// all of the currently believed beliefs.

// 注意，这里的 "most informative" 又是就 merge 而言的了，
// 别忘了 merge 所定义的 implies 与 isStronger 不同。

function strongest<A>(beliefs: Array<Belief<A>>): Belief<A> | Nothing {
  const stillBelievedBeliefs = beliefs.filter(isBeliefBelieved)
  return stillBelievedBeliefs.reduce(
    (result, belief) => merge(result, belief),
    nothing,
  )
}

function isBeliefBelieved<A>(belief: Belief<A>): boolean {
  return Array.from(belief.reasons).every(isReasonBelieved)
}

const globelReasonBlackList: Reasons = new Set()

function isReasonBelieved(entry: string): boolean {
  return !globelReasonBlackList.has(entry)
}
