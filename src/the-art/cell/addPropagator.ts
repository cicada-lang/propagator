import type { Propagator } from "../propagator/index.js"
import { schedule } from "../scheduler/index.js"
import { type Cell } from "./Cell.js"

export function addPropagator<T>(cell: Cell<T>, propagator: Propagator): void {
  if (cell.propagators.includes(propagator)) {
    return
  }

  cell.propagators.push(propagator)
  schedule([propagator])
}
