import { Belief } from "../belief/index.js"
import { type MergeConflict } from "../merge/index.js"
import { isNothing, type Nothing } from "../nothing/index.js"
import { BeliefSystem } from "./BeliefSystem.js"
import { isStrongerBelief } from "./isStrongerBelief.js"
import { strongestBelief } from "./strongestBelief.js"

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
  const consequence = strongestBelief(candidate.beliefs)
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

export function assimilateOne<A, B>(
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

  if (base.beliefs.some((oldBelief) => isStrongerBelief(oldBelief, belief))) {
    return base
  }

  // Conversely, if the information in any existing belief is
  // deducible from the information in the new one, we can throw those
  // existing ones away.

  // 注意，对于偏序关系来说，
  // not(lteq(x, y)) 不等于 lteq(y, x)，
  // 前者还包含了偏序关系中不可比较的情况。

  const strongerOldBeliefs = base.beliefs.filter(
    (oldBelief) => !isStrongerBelief(belief, oldBelief),
  )

  return BeliefSystem<A | B>([...strongerOldBeliefs, belief])
}
