import type { Propagator } from "../propagator/index.js"

export function broadcast(propagators: Array<Propagator>): void {
  for (const propagator of propagators) {
    propagator()
  }
}
