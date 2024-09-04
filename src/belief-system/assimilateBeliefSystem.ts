import { type Nothing, isNothing } from "../nothing/Nothing.js"
import { assimilateBelief } from "./assimilateBelief.js"
import type { BeliefSystem } from "./BeliefSystem.js"

// The procedure `assimilate` incorporates all the given items, one by
// one, into the given belief system with no deduction of
// consequences.

export function assimilateBeliefSystem<A, B>(
  base: BeliefSystem<A>,
  target: BeliefSystem<B> | Nothing,
): BeliefSystem<A | B> {
  if (isNothing(target)) {
    return base
  }

  return target.beliefs.reduce<BeliefSystem<A | B>>(
    (result, belief) => assimilateBelief(result, belief),
    base,
  )
}
