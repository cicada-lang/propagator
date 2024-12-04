import {
  beliefMergeManyStillBelieved,
  checkConsistent,
  type Belief,
} from "../belief/index.ts"
import type { Nothing } from "../nothing/Nothing.ts"
import type { BeliefSystem } from "./BeliefSystem.ts"
import { assimilateBelief } from "./assimilateBelief.ts"

export function beliefSystemQuery<A>(
  beliefSystem: BeliefSystem<A>,
): Belief<A> | Nothing {
  const answer = beliefMergeManyStillBelieved(beliefSystem.beliefs)
  const betterBeliefSystem = assimilateBelief(beliefSystem, answer)
  if (beliefSystem !== betterBeliefSystem) {
    beliefSystem.beliefs = betterBeliefSystem.beliefs
  }

  checkConsistent(answer)
  return answer
}
