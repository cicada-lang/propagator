import type { Job } from "./Scheduler.js"
import { globalScheduler } from "./initializeScheduler.js"

export async function run(): Promise<void> {
  while (globalScheduler.jobs.length > 0) {
    const job = globalScheduler.jobs.pop() as Job
    await job.propagator()
  }
}
