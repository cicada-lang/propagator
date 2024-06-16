import type { Propagator } from "../propagator/index.js"

export function schedule(propagators: Array<Propagator>): void {
  for (const propagator of propagators) {
    propagator()
  }
}
