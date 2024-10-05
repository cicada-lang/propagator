import type { Propagator } from "../propagator/index.js"
import { globalScheduler } from "./initializeScheduler.js"

let allEverScheduledPropagators = new Set<Propagator>()

export function schedule(propagators: Array<Propagator>): void {
  for (const propagator of propagators) {
    allEverScheduledPropagators.add(propagator)
    globalScheduler.jobs.push({
      "@type": "Job",
      propagator,
    })
  }
}

export function scheduleAllEverScheduledPropagators(): void {
  schedule(Array.from(allEverScheduledPropagators))
}

export function globalSchedulerAbort(): void {
  globalScheduler.jobs = []
  // allEverScheduledPropagators = new Set()
}
