import { type Cell, addPropagator, broadcast } from "../cell/index.js"
import type { Propagator } from "./Propagator.js"

export function watch(
  cells: Array<Cell<unknown>>,
  propagator: Propagator,
): void {
  for (const cell of cells) {
    addPropagator(cell, propagator)
  }

  broadcast([propagator])
}
