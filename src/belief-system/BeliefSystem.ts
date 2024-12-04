import { Belief, isBelief } from "../belief/index.ts"
import { isNonNullObject } from "../utils/isNonNullObject.ts"

export type BeliefSystem<A> = {
  "@type": "BeliefSystem"
  beliefs: Array<Belief<A>>
}

export function BeliefSystem<A>(beliefs: Array<Belief<A>>): BeliefSystem<A> {
  return {
    "@type": "BeliefSystem",
    beliefs,
  }
}

export function isBeliefSystem(x: any): x is BeliefSystem<any> {
  return isNonNullObject(x) && x["@type"] === "BeliefSystem"
}

export function toBeliefSystem(x: any): BeliefSystem<any> {
  if (isBeliefSystem(x)) return x
  if (isBelief(x)) return BeliefSystem([x])
  return BeliefSystem([Belief(x, new Set())])
}
