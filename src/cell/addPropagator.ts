import type { Propagator } from "../propagator/index.ts"
import { schedule } from "../scheduler/index.ts"
import { type Cell } from "./Cell.ts"

export function addPropagator<T>(cell: Cell<T>, propagator: Propagator): void {
  if (cell.propagators.includes(propagator)) {
    return
  }

  cell.propagators.push(propagator)
  schedule([propagator])
}
