import { type MergeConflict } from "../merge/index.js"
import { isNothing, type Nothing } from "../nothing/index.js"
import { assimilateOne } from "./assimilateOne.js"
import { BeliefSystem } from "./BeliefSystem.js"
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
