import { isContradiction } from "../merge/merge.js"
import { type Cell } from "./Cell.js"
import { broadcast } from "./broadcast.js"
2
export function addContent<T>(cell: Cell<T>, increment?: T): void {
  const newContent = cell.merge(cell.content, increment)
  if (newContent === cell.content) {
    return
  }
  if (isContradiction(newContent)) {
    console.error({
      who: "addContent",
      message: "Ack! Inconsistency!",
      increment,
      oldContent: cell.content,
    })

    throw new Error(`[addContent] Ack! Inconsistency!`)
  }

  cell.content = newContent
  broadcast(cell.propagators)
}
