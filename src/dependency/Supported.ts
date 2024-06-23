import { isNonNullObject } from "../utils/isNonNullObject.js"

export type Supported<T> = {
  "@type": "Supported"
  value: T
  supports: Set<string>
}

export function Supported<T>(value: T, supports: Set<string>): Supported<T> {
  return {
    "@type": "Supported",
    value,
    supports,
  }
}

export function isSupported(x: any): x is Supported<any> {
  return isNonNullObject(x) && x["@type"] === "Supported"
}
