import assert from "node:assert"
import { isNonNullObject } from "../utils/isNonNullObject.js"
import { log } from "../utils/log.js"

export type Support = Set<string>
export type SupportLike = Support | Array<string>

export function toSupport(x: SupportLike): Support {
  if (x instanceof Array) {
    return new Set(x)
  }

  return x
}

export type Supported<T> = {
  "@type": "Supported"
  value: T
  support: Support
}

export function Supported<T>(
  value: T,
  support: Support | Array<string>,
): Supported<T> {
  support = toSupport(support)

  return {
    "@type": "Supported",
    value,
    support,
  }
}

export function isSupported(x: any): x is Supported<any> {
  return isNonNullObject(x) && x["@type"] === "Supported"
}

export function toSupported(x: any): Supported<any> {
  if (isSupported(x)) return x
  return Supported(x, new Set())
}

export function assertSupported(
  target: any,
  support?: Support | Array<string>,
): asserts target is Supported<any> {
  if (!isSupported(target)) {
    const message = `Assertion fails.`
    log({
      kind: "Error",
      who: "assertSupported",
      message,
      target,
      support,
    })

    throw new Error(`[assertSupported] ${message}`)
  }

  if (support !== undefined) {
    support = toSupport(support)

    assert.deepStrictEqual(target.support, support)
  }
}
