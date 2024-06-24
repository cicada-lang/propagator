import { detectMergeConflict, merge } from "../merge/index.js"
import { schedule } from "../scheduler/index.js"
import { type Cell } from "./Cell.js"

export function put<T>(cell: Cell<T>, increment?: T): void {
  const newContent = merge(cell.content, increment)
  if (newContent === cell.content) {
    return
  }

  if (detectMergeConflict(newContent)) {
    console.error({
      who: "put",
      message: "Ack! Inconsistency!",
      increment,
      oldContent: cell.content,
    })

    throw new Error(`[put] Ack! Inconsistency!`)
  }

  cell.content = newContent
  schedule(cell.propagators)
}
