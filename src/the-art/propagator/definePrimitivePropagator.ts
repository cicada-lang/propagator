import {
  addContent,
  addPropagator,
  broadcast,
  content,
  type Cell,
} from "../cell/index.js"
import type { Propagator } from "./Propagator.js"

export type PropagatorDefinition = {
  (...args: Array<Cell<unknown>>): void
  arity: number
}

export function definePrimitivePropagator(
  arity: number,
  fn: (...args: Array<any>) => any,
): PropagatorDefinition {
  const propagatorDefinition: PropagatorDefinition = (...args) => {
    const inputs = args.slice(0, args.length - 1)
    const output = args[args.length - 1]
    const liftedFn = liftToCellContents(fn)
    watch(inputs, () => {
      addContent(output, liftedFn(...inputs.map(content)))
    })
  }

  propagatorDefinition.arity = arity

  return propagatorDefinition
}

export function watch(
  cells: Array<Cell<unknown>>,
  propagator: Propagator,
): void {
  for (const cell of cells) {
    addPropagator(cell, propagator)
  }

  broadcast([propagator])
}

function liftToCellContents(
  fn: (...args: Array<any>) => any,
): (...args: Array<any>) => any {
  return (...args) => {
    if (args.includes(undefined)) {
      return undefined
    } else {
      return fn(...args)
    }
  }
}
