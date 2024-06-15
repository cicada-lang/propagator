import { type Cell } from "./Cell.js"
import { broadcast } from "./broadcast.js"

export function addContent<T>(cell: Cell<T>, increment?: T): void {
  if (increment === undefined) {
    return
  }

  if (cell.content === undefined) {
    cell.content = increment
    broadcast(cell.propagators)
  }

  if (increment === cell.content) {
    return
  }

  console.error({
    who: "addContent",
    message: "Ack! Inconsistency!",
    increment,
    oldContent: cell.content,
  })

  throw new Error(`[addContent] Ack! Inconsistency!`)
}
