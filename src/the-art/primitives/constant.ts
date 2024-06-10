import { type Cell } from "../cell/index.js"
import { definePrimitive2 } from "../propagator/definePrimitive2.js"

export function constant<T>(value: T): (x: Cell<T>) => void {
  return definePrimitive2(0, () => value)
}
