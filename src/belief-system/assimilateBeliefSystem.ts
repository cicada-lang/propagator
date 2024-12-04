import { assimilateBelief } from "./assimilateBelief.ts"
import type { BeliefSystem } from "./BeliefSystem.ts"

// The procedure `assimilate` incorporates all the given items, one by
// one, into the given belief system with no deduction of
// consequences.

export function assimilateBeliefSystem<A>(
  base: BeliefSystem<A>,
  target: BeliefSystem<A>,
): BeliefSystem<A> {
  return target.beliefs.reduce<BeliefSystem<A>>(
    (result, belief) => assimilateBelief(result, belief),
    base,
  )
}
