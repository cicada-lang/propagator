import { setEqual } from "../utils/set/index.ts"
import { type Belief } from "./index.ts"

export function beliefEqual<A>(
  x: Belief<A>,
  y: Belief<A>,
  options?: {
    valueEqual?: (x: A, y: A) => boolean
  },
): boolean {
  const valueEqual = options?.valueEqual || ((x, y) => x === y)

  return valueEqual(x.value, y.value) && setEqual(x.reasons, y.reasons)
}
