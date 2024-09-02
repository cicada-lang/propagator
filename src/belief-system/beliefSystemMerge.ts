import { Belief } from "../belief/index.js"
import { isNothing, nothing, type Nothing } from "../cell/index.js"
import { merge, moreInformative, type MergeConflict } from "../merge/index.js"
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
  const consequence = strongestConsequence(candidate)
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
  // from that in some belief already in the TMS. If so, we can just
  // throw the new one away.

  if (base.beliefs.some((oldBelief) => stronger(oldBelief, belief))) {
    return base
  }

  // Conversely, if the information in any existing belief is
  // deducible from the information in the new one, we can throw those
  // existing ones away.

  const strongerOldBeliefs = base.beliefs.filter(
    (oldBelief) => !stronger(belief, oldBelief),
  )

  return BeliefSystem<A | B>([...strongerOldBeliefs, belief])
}

// The predicate `stronger` returns true only if the information
// contained in the second argument is deducible from that contained
// in the first.

// About the ordered set of beliefs:
// - A belief has stronger value is stronger.
// - A belief has less reasons is stronger.

function stronger<A, B>(x: Belief<A>, y: Belief<B>): boolean {
  return (
    moreInformative(x.value, y.value) && setIsSubsetOf(x.reasons, y.reasons)
  )
}

function strongestConsequence<A>(
  candidate: BeliefSystem<A>,
): Belief<A> | Nothing {
  const stillBelievedBeliefs = candidate.beliefs.filter(isBeliefBelieved)
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
