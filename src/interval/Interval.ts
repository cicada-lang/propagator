import { isNonNullObject } from "../utils/isNonNullObject.js"

export type Interval = {
  "@type": "Interval"
  low: number
  high: number
}

export function Interval(low: number, high: number): Interval {
  return {
    "@type": "Interval",
    low,
    high,
  }
}

export function exactInterval(x: number): Interval {
  return Interval(x, x)
}

export function isInterval(x: any): x is Interval {
  return isNonNullObject(x) && x["@type"] === "Interval"
}

export function toInterval(x: number | Interval): Interval {
  if (isInterval(x)) return x
  return exactInterval(x)
}
