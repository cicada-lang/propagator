import { isNonNullObject } from "../utils/isNonNullObject.js"

export type Supported<T> = {
  "@type": "Supported"
  value: T
  support: Set<string>
}

export function Supported<T>(value: T, support: Set<string>): Supported<T> {
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
