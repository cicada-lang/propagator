// https://en.wikipedia.org/wiki/Interval_arithmetic

import { Interval } from "./Interval.ts"

export function intervalAdd(x: Interval, y: Interval): Interval {
  return Interval(x.low + y.low, x.high + y.high)
}

export function intervalSub(x: Interval, y: Interval): Interval {
  return Interval(x.low - y.low, x.high - y.high)
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
  return Interval(Math.max(x.low, y.low), Math.min(x.high, y.high))
}

export function intervalEqual(x: Interval, y: Interval): boolean {
  return x.low === y.low && x.high === y.high
}

export function intervalAlmostEqual(
  x: Interval,
  y: Interval,
  epsilon: number,
): boolean {
  return (
    Math.abs(x.low - y.low) <= epsilon && Math.abs(x.high - y.high) <= epsilon
  )
}

export function intervalContainsNumber(x: Interval, n: number): boolean {
  return x.low <= n && n <= x.high
}
