import { merge } from "../merge/index.js"
import { schedule } from "../scheduler/index.js"
import { type Cell } from "./Cell.js"

export function put<T>(cell: Cell<T>, increment?: any): void {
  try {
    const newContent = merge(cell.content, increment)
    if (newContent === cell.content) {
      return
    }

    cell.content = newContent
    schedule(cell.propagators)
  } catch (error) {
    console.error({ who: "put", error })
  }
}
