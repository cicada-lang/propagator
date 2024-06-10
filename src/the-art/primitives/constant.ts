import { type Cell } from "../cell/index.js"
import { propagatorConstructorFromFunction } from "../propagator/propagatorConstructorFromFunction.js"

export function constant<T>(value: T): (x: Cell<T>) => void {
  return propagatorConstructorFromFunction(0, () => value)
}
