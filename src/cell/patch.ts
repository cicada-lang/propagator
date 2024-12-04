import { merge } from "../merge/index.ts"
import { schedule } from "../scheduler/index.ts"
import { type Cell } from "./Cell.ts"

export function patch<T>(cell: Cell<T>, increment?: any): void {
  const newContent = merge(cell.content, increment)
  if (newContent === cell.content) {
    return
  }

  cell.content = newContent
  schedule(cell.propagators)
}
