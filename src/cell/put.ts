import { detectMergeConflict, merge } from "../merge/index.js"
import { schedule } from "../scheduler/index.js"
import { log } from "../utils/log.js"
import { type Cell } from "./Cell.js"

export function put<T>(cell: Cell<T>, increment?: any): void {
  const newContent = merge(cell.content, increment)
  if (newContent === cell.content) {
    return
  }

  if (detectMergeConflict(newContent)) {
    const message = "Ack! Inconsistency!"
    log({
      kind: "Error",
      who: "put",
      message,
      increment,
      oldContent: cell.content,
    })

    throw new Error(`[put] ${message}`)
  }

  cell.content = newContent
  schedule(cell.propagators)
}
