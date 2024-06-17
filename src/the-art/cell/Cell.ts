import { merge, type Contradiction } from "../merge/index.js"
import type { Propagator } from "../propagator/index.js"
import { nothing, type Nothing } from "./Nothing.js"

export type Merge<T> = (
  content: T | Nothing,
  increment: any,
) => T | Nothing | Contradiction

export type Cell<T> = {
  "@type": "Cell"
  content: T | Nothing
  propagators: Array<Propagator>
  merge: Merge<T>
}

export function cell<T>(
  content?: T,
  options: {
    merge: Merge<T>
  } = {
    merge,
  },
): Cell<T> {
  return {
    "@type": "Cell",
    content: content || nothing,
    propagators: [],
    merge: options.merge,
  }
}

export function content<T>(cell: Cell<T>): T | Nothing {
  return cell.content
}
