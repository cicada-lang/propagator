import type { Propagator } from "../propagator/index.ts"

export type Job = {
  "@type": "Job"
  propagator: Propagator
}

export type Scheduler = {
  "@type": "Scheduler"
  jobs: Array<Job>
}
