import { Belief } from "../belief/index.js"
import { isNothing, nothing, type Nothing } from "../cell/index.js"
import { implies, merge, type MergeConflict } from "../merge/index.js"
import type { Reasons } from "../reason/index.js"
import { setIsSubsetOf } from "../utils/set/index.js"
import { BeliefSystem } from "./BeliefSystem.js"

// Asking the belief system to deduce all the consequences of all its
// facts all the time is perhaps a bad idea, so when we merge belief
// systems we assimilate the facts from the incoming one into the
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

// The predicate `stronger` returns true only if the information
// contained in the second argument is deducible from that contained
// in the first.

// About the ordered set of beliefs:
// - A belief has stronger value is stronger.
// - A belief has less reasons is stronger.

// 注意，这与用 merge 所定义的 belief 之间的 implies 不同，
// merge 两个 belief 时，不是 reasons 集合之间求交，而是求并。

function isStronger<A, B>(x: Belief<A>, y: Belief<B>): boolean {
  return implies(x.value, y.value) && setIsSubsetOf(x.reasons, y.reasons)
}

function strongest<A>(beliefs: Array<Belief<A>>): Belief<A> | Nothing {
  const stillBelievedBeliefs = beliefs.filter(isBeliefBelieved)
  return stillBelievedBeliefs.reduce(
    (result, belief) => merge(result, belief),
    nothing,
  )
}

function isBeliefBelieved<A>(belief: Belief<A>): boolean {
  return Array.from(belief.reasons).every(isReasonEntryBelieved)
}

const globelReasonEntryBlackList: Reasons = new Set()

function isReasonEntryBelieved(entry: string): boolean {
  return !globelReasonEntryBlackList.has(entry)
}
