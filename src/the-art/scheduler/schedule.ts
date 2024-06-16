import type { Propagator } from "../propagator/index.js"
import { globalScheduler } from "./initializeScheduler.js"

export function schedule(propagators: Array<Propagator>): void {
  for (const propagator of propagators) {
    globalScheduler.jobs.push({
      "@type": "Job",
      propagator,
    })
  }
}
