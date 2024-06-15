import { type Cell } from "./Cell.js"
import { broadcast } from "./broadcast.js"

export function addContent<T>(cell: Cell<T>, content?: T): void {
  if (content === undefined) {
    return
  }

  if (cell.content === undefined) {
    cell.content = content
    broadcast(cell.propagators)
  }

  if (content === cell.content) {
    return
  }

  console.error({
    who: "addContent",
    message: "Ack! Inconsistency!",
    content,
    oldValue: cell.content,
  })

  throw new Error(`[addContent] Ack! Inconsistency!`)
}
