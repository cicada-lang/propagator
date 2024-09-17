import type { Belief } from "../belief/Belief.js"
import { type Nothing, isNothing } from "../nothing/Nothing.js"
import { BeliefSystem } from "./BeliefSystem.js"
import { isStrongerBelief } from "./isStrongerBelief.js"

export function assimilateBelief<A>(
  base: BeliefSystem<A>,
  belief: Belief<A> | Nothing,
): BeliefSystem<A> {
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

  return BeliefSystem([...strongerOldBeliefs, belief])
}
