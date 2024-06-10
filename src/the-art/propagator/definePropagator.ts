import type { Cell } from "../cell/index.js"
import type { PropagatorDefinition } from "./PropagatorDefinition.js"

export function definePropagator(
  arity: number,
  fn: (...args: Array<Cell<unknown>>) => void,
): PropagatorDefinition {
  const definiton = (...args: Array<Cell<unknown>>) => {
    fn(...args)
  }

  definiton.arity = arity

  return definiton
}
