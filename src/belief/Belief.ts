import { toReasons, type Reasons } from "../reason/index.js"
import { isNonNullObject } from "../utils/isNonNullObject.js"

export type Belief<T> = {
  "@type": "Belief"
  value: T
  reasons: Reasons
}

export function Belief<T>(
  value: T,
  reasons: Reasons | Array<string>,
): Belief<T> {
  reasons = toReasons(reasons)

  return {
    "@type": "Belief",
    value,
    reasons,
  }
}

export function isBelief(x: any): x is Belief<any> {
  return isNonNullObject(x) && x["@type"] === "Belief"
}

export function toBelief(x: any): Belief<any> {
  if (isBelief(x)) return x
  return Belief(x, new Set())
}
