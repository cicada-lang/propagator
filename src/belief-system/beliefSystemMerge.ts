import { Belief } from "../belief/index.js"
import { isNothing, nothing, type Nothing } from "../cell/index.js"
import { implies, merge, type MergeConflict } from "../merge/index.js"
import type { Reasons } from "../reason/index.js"
import { setIsSubsetOf } from "../utils/set/index.js"
import { BeliefSystem } from "./BeliefSystem.js"

// Asking the TMS to deduce all the consequences of all its facts all
// the time is perhaps a bad idea, so when we merge TMSes we
// assimilate the facts from the incoming one into the current one,
// and then deduce only those consequences that are relevant to the
// current worldview.

export function beliefSystemMerge<A, B>(
  content: BeliefSystem<A>,
  increment: BeliefSystem<B>,
): BeliefSystem<A | B> | MergeConflict {
  const candidate = assimilate(content, increment)
  const consequence = strongestConsequence(candidate)
  return assimilateOne(candidate, consequence)
}

// The procedure `assimilate` incorporates all the given items, one by
// one, into the given TMS with no deduction of consequences.

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

function subsumes<A, B>(x: Belief<A>, y: Belief<B>): boolean {
  return implies(x.value, y.value) && setIsSubsetOf(x.reasons, y.reasons)
}

function assimilateOne<A, B>(
  base: BeliefSystem<A>,
  belief: Belief<B> | Nothing,
): BeliefSystem<A | B> {
  if (isNothing(belief)) {
    return base
  }

  if (base.beliefs.some((oldBelief) => subsumes(oldBelief, belief))) {
    return base
  }

  const notSubsumed = base.beliefs.filter(
    (oldBelief) => !subsumes(belief, oldBelief),
  )

  return BeliefSystem<A | B>([...notSubsumed, belief])
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
