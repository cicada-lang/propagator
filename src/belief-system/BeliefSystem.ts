import { type Belief } from "../belief/index.js"
import { isNonNullObject } from "../utils/isNonNullObject.js"

export type BeliefSystem<A> = {
  "@type": "BeliefSystem"
  beliefs: Array<Belief<A>>
}

export function isBeliefSystem(x: any): x is BeliefSystem<any> {
  return isNonNullObject(x) && x["@type"] === "BeliefSystem"
}
