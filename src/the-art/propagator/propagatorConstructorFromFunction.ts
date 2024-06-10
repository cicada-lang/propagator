import {
  addContent,
  addPropagator,
  broadcast,
  content,
  type Cell,
} from "../cell/index.js"
import type { Propagator } from "./Propagator.js"

export type PropagatorConstructor = (...args: Array<Cell<unknown>>) => void

export function propagatorConstructorFromFunction(
  fn: (...args: Array<any>) => any,
): PropagatorConstructor {
  return (...args) => {
    const inputs = args.slice(0, args.length - 1)
    const output = args[args.length - 1]
    const liftedFn = liftToCellContents(fn)
    watch(inputs, () => {
      addContent(output, liftedFn(...inputs.map(content)))
    })
  }
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
