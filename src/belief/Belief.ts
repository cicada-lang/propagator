import assert from "node:assert"
import { isNonNullObject } from "../utils/isNonNullObject.js"
import { log } from "../utils/log.js"

export type Reason = string
export type Reasons = Set<Reason>
export type ReasonLike = Reasons | Array<Reason>

export function toReason(x: ReasonLike): Reasons {
  if (x instanceof Array) {
    return new Set(x)
  }

  return x
}

export type Belief<T> = {
  "@type": "Belief"
  value: T
  reasons: Reasons
}

export function Belief<T>(
  value: T,
  reasons: Reasons | Array<string>,
): Belief<T> {
  reasons = toReason(reasons)

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

export function assertBelief(
  target: any,
  reasons?: Reasons | Array<string>,
): asserts target is Belief<any> {
  if (!isBelief(target)) {
    const message = `Assertion fails.`
    log({
      kind: "Error",
      who: "assertBelief",
      message,
      target,
      reasons,
    })

    throw new Error(`[assertBelief] ${message}`)
  }

  if (reasons !== undefined) {
    reasons = toReason(reasons)

    assert.deepStrictEqual(target.reasons, reasons)
  }
}
