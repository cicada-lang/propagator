// https://en.wikipedia.org/wiki/Interval_arithmetic

import { Interval } from "./Interval.js"

export function intervalAdd(x: Interval, y: Interval): Interval {
  return Interval(x.low + y.low, x.high + y.high)
}

export function intervalMul(x: Interval, y: Interval): Interval {
  return Interval(x.low * y.low, x.high * y.high)
}

export function intervalDiv(x: Interval, y: Interval): Interval {
  return intervalMul(x, Interval(1 / y.high, 1 / y.low))
}

export function intervalSquare(x: Interval): Interval {
  return Interval(x.low * x.low, x.high * x.high)
}

export function intervalSqrt(x: Interval): Interval {
  return Interval(Math.sqrt(x.low), Math.sqrt(x.high))
}

export function intervalIsEmpty(x: Interval): boolean {
  return x.low > x.high
}

export function intervalIntersect(x: Interval, y: Interval): Interval {
  return Interval(Math.max(x.low, y.low), Math.max(x.high, y.high))
}
