import { setEqual } from "../utils/set/index.js"
import { type Belief } from "./index.js"

export function beliefEqual<A>(
  x: Belief<A>,
  y: Belief<A>,
  options: {
    valueEqual: (x: A, y: A) => boolean
  },
): boolean {
  return options.valueEqual(x.value, y.value) && setEqual(x.reasons, y.reasons)
}
