import { Belief, isBelief } from "../belief/index.js"
import { isNothing, nothing, type Nothing } from "../cell/index.js"
import { implies, merge, type MergeConflict } from "../merge/index.js"
import type { Reasons } from "../reason/index.js"
import { setIsSubsetOf } from "../utils/set/index.js"
import { BeliefSystem } from "./BeliefSystem.js"

export function beliefSystemMerge<A, B>(
  content: BeliefSystem<A>,
  increment: BeliefSystem<B>,
): BeliefSystem<A | B> | MergeConflict {
  const candidate = beliefSystemAssimilate(content, increment)
  const consequence = strongestConsequence(candidate)
  return beliefSystemAssimilate(candidate, consequence)
}

function beliefSystemAssimilate<A, B>(
  base: BeliefSystem<A>,
  target: BeliefSystem<B> | Belief<B> | Nothing,
): BeliefSystem<A | B> {
  if (isNothing(target)) {
    return base
  } else if (isBelief(target)) {
    return beliefSystemAssimilateOne(base, target)
  } else {
    return target.beliefs.reduce<BeliefSystem<A | B>>(
      (result, belief) => beliefSystemAssimilateOne(result, belief),
      base,
    )
  }
}

function subsumes<A, B>(x: Belief<A>, y: Belief<B>): boolean {
  return implies(x.value, y.value) && setIsSubsetOf(x.reasons, y.reasons)
}

function beliefSystemAssimilateOne<A, B>(
  base: BeliefSystem<A>,
  belief: Belief<B>,
): BeliefSystem<A | B> {
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
