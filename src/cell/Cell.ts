import { nothing, type Nothing } from "../nothing/index.js"
import type { Propagator } from "../propagator/index.js"

export type Cell<T> = {
  "@type": "Cell"
  content: T | Nothing
  propagators: Array<Propagator>
}

export function Cell<T>(content?: T): Cell<T> {
  return {
    "@type": "Cell",
    content: content || nothing,
    propagators: [],
  }
}
