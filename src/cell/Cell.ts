import type { Propagator } from "../propagator/index.js"
import { nothing, type Nothing } from "./Nothing.js"

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
