import {
  beliefMergeManyStillBelieved,
  checkConsistent,
  type Belief,
} from "../belief/index.js"
import type { Nothing } from "../nothing/Nothing.js"
import type { BeliefSystem } from "./BeliefSystem.js"
import { assimilateBelief } from "./assimilateBelief.js"

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
