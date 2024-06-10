import type { Propagator } from "../propagator/index.js"
import { broadcast } from "./broadcast.js"

export type Cell<T> = {
  "@type": "Cell"
  value?: T
  propagators: Array<Propagator>
}

export function makeCell<T>(value?: T): Cell<T> {
  return {
    "@type": "Cell",
    value,
    propagators: [],
  }
}

export function content<T>(cell: Cell<T>): T | undefined {
  return cell.value
}

export function addContent<T>(cell: Cell<T>, value?: T): void {
  if (value === undefined) {
    return
  }

  if (cell.value === undefined) {
    console.log({ value })
    cell.value = value
    broadcast(cell.propagators)
  }

  if (value === cell.value) {
    return
  }

  console.error({
    who: "addContent",
    message: "Ack! Inconsistency!",
    value,
    oldValue: cell.value,
  })

  throw new Error(`[addContent] Ack! Inconsistency!`)
}

export function addPropagator<T>(cell: Cell<T>, propagator: Propagator): void {
  if (cell.propagators.includes(propagator)) {
    return
  }

  cell.propagators.push(propagator)
  broadcast([propagator])
}
