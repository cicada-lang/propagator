import { broadcast } from "./broadcast.js"
import { type Cell } from "./Cell.js"

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
