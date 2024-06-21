import { isNonNullObject } from "../utils/isNonNullObject.js"

export type Supported<T> = {
  "@type": "Supported"
  content: T
  supports: Set<string>
}

export function Supported<T>(content: T, supports: Set<string>): Supported<T> {
  return {
    "@type": "Supported",
    content,
    supports,
  }
}

export function isSupported(x: any): x is Supported<any> {
  return isNonNullObject(x) && x["@type"] === "Supported"
}
