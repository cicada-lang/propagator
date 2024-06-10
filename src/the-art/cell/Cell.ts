import type { Propagator } from "../propagator/index.js"

export type Cell<T> = {
  "@type": "Cell"
  value?: T
  propagators: Array<Propagator>
}

export function createCell<T>(value?: T): Cell<T> {
  return {
    "@type": "Cell",
    value,
    propagators: [],
  }
}

export function content<T>(cell: Cell<T>): T | undefined {
  return cell.value
}
