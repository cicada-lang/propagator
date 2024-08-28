import assert from "node:assert"
import { isNonNullObject } from "../utils/isNonNullObject.js"
import { log } from "../utils/log.js"

export type Reason = Set<string>
export type ReasonLike = Reason | Array<string>

export function toReason(x: ReasonLike): Reason {
  if (x instanceof Array) {
    return new Set(x)
  }

  return x
}

export type Belief<T> = {
  "@type": "Belief"
  value: T
  reason: Reason
}

export function Belief<T>(value: T, reason: Reason | Array<string>): Belief<T> {
  reason = toReason(reason)

  return {
    "@type": "Belief",
    value,
    reason,
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
  reason?: Reason | Array<string>,
): asserts target is Belief<any> {
  if (!isBelief(target)) {
    const message = `Assertion fails.`
    log({
      kind: "Error",
      who: "assertBelief",
      message,
      target,
      reason,
    })

    throw new Error(`[assertBelief] ${message}`)
  }

  if (reason !== undefined) {
    reason = toReason(reason)

    assert.deepStrictEqual(target.reason, reason)
  }
}
