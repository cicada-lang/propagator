import { type MergeConflict } from "../merge-conflict/index.js"
import { assimilateBelief } from "./assimilateBelief.js"
import { assimilateBeliefSystem } from "./assimilateBeliefSystem.js"
import { beliefMergeManyStillBelieved } from "./beliefMergeManyStillBelieved.js"
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
  const candidate = assimilateBeliefSystem(content, increment)
  const consequence = beliefMergeManyStillBelieved(candidate.beliefs)
  return assimilateBelief(candidate, consequence)
}
