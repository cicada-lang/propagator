import { type Scheduler } from "./Scheduler.js"

export const globalScheduler: Scheduler = {
  "@type": "Scheduler",
  jobs: [],
}

export function initializeScheduler(): Scheduler {
  globalScheduler.jobs = []
  return globalScheduler
}
