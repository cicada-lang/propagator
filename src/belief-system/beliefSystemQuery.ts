import type { Belief } from "../belief/index.js"
import type { Nothing } from "../nothing/Nothing.js"
import type { BeliefSystem } from "./BeliefSystem.js"
import { assimilateOne } from "./beliefSystemMerge.js"
import { strongestBelief } from "./strongestBelief.js"

export function beliefSystemQuery<A>(
  beliefSystem: BeliefSystem<A>,
): Belief<A> | Nothing {
  const answer = strongestBelief(beliefSystem.beliefs)
  const betterBeliefSystem = assimilateOne(beliefSystem, answer)
  if (beliefSystem !== betterBeliefSystem) {
    beliefSystem.beliefs = betterBeliefSystem.beliefs
  }

  return answer
}
