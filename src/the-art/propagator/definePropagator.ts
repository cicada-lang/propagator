import type { Cell } from "../cell/index.js"

type PropagatorDefinition = {
  arity: number
  (...args: Array<Cell<unknown>>): void
}

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
