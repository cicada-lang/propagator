import { merge, type Contradiction } from "../merge/merge.js"
import type { Propagator } from "../propagator/index.js"

export type Merge<T> = (
  content: T | undefined,
  increment: any,
) => T | Contradiction

export type Cell<T> = {
  "@type": "Cell"
  content?: T
  propagators: Array<Propagator>
  merge: Merge<T>
}

export function createCell<T>(
  content?: T,
  options: {
    merge: Merge<T>
  } = {
    merge,
  },
): Cell<T> {
  return {
    "@type": "Cell",
    content,
    propagators: [],
    merge: options.merge,
  }
}

export function content<T>(cell: Cell<T>): T | undefined {
  return cell.content
}
