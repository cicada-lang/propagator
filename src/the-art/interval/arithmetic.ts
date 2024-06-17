// https://en.wikipedia.org/wiki/Interval_arithmetic

import type { Interval } from "./Interval.js"

export function intervalAdd(x: Interval, y: Interval): Interval {
  return {
    low: x.low + y.low,
    high: x.high + y.high,
  }
}

export function intervalMul(x: Interval, y: Interval): Interval {
  return {
    low: x.low * y.low,
    high: x.high * y.high,
  }
}

export function intervalDiv(x: Interval, y: Interval): Interval {
  return intervalMul(x, {
    low: 1 / y.high,
    high: 1 / y.low,
  })
}

export function intervalSquare(x: Interval): Interval {
  return {
    low: x.low * x.low,
    high: x.high * x.high,
  }
}

export function intervalSqrt(x: Interval): Interval {
  return {
    low: Math.sqrt(x.low),
    high: Math.sqrt(x.high),
  }
}

export function intervalIsEmpty(x: Interval): boolean {
  return x.low > x.high
}
