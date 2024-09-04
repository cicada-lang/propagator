import { isInterval } from "../interval/Interval.js"
import { isNumber } from "../utils/isNumber.js"

export function isPrimitive(x: any): boolean {
  return isNumber(x) || isInterval(x)
}
