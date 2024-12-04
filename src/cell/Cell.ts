import { nothing, type Nothing } from "../nothing/index.ts"
import type { Propagator } from "../propagator/index.ts"

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
