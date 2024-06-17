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

export function isInterval(x: any): x is Interval {
  return isNonNullObject(x) && x["@type"] === "Interval"
}
