import { type Cell } from "../cell/index.js"
import { definePrimitive } from "../propagator/definePrimitive.js"

export function constant<T>(value: T): (x: Cell<T>) => void {
  return definePrimitive(() => value)
}
