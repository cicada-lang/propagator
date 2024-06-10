import { type Cell } from "../cell/index.js"
import { definePrimitivePropagator } from "../propagator/definePrimitivePropagator.js"

export function constant<T>(value: T): (x: Cell<T>) => void {
  return definePrimitivePropagator(0, () => value)
}
