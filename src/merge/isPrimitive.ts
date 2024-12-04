import { isInterval } from "../interval/Interval.ts"
import { isNumber } from "../utils/isNumber.ts"

export function isPrimitive(x: any): boolean {
  return isNumber(x) || isInterval(x)
}
