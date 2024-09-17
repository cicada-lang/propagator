import { merge } from "../merge/index.js"
import { schedule } from "../scheduler/index.js"
import { type Cell } from "./Cell.js"

export function patch<T>(cell: Cell<T>, increment?: any): void {
  const newContent = merge(cell.content, increment)
  if (newContent === cell.content) {
    return
  }

  cell.content = newContent
  schedule(cell.propagators)
}
