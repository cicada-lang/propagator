import { isMergeConflict } from "../merge/index.js"
import { schedule } from "../scheduler/index.js"
import { type Cell } from "./Cell.js"

export function put<T>(cell: Cell<T>, increment?: T): void {
  const newContent = cell.merge(cell.content, increment)
  if (newContent === cell.content) {
    return
  }
  if (isMergeConflict(newContent)) {
    console.error({
      who: "addContent",
      message: "Ack! Inconsistency!",
      increment,
      oldContent: cell.content,
    })

    throw new Error(`[addContent] Ack! Inconsistency!`)
  }

  cell.content = newContent
  schedule(cell.propagators)
}
