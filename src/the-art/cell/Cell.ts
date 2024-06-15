import type { Propagator } from "../propagator/index.js"

export type Cell<T> = {
  "@type": "Cell"
  content?: T
  propagators: Array<Propagator>
}

export function createCell<T>(content?: T): Cell<T> {
  return {
    "@type": "Cell",
    content,
    propagators: [],
  }
}

export function content<T>(cell: Cell<T>): T | undefined {
  return cell.content
}
