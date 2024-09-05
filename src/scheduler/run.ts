import type { Job } from "./Scheduler.js"
import { globalScheduler } from "./initializeScheduler.js"

export let isRunning = false
export async function run(): Promise<void> {
  try {
    isRunning = true
    while (globalScheduler.jobs.length > 0) {
      // 我们用「先进先出」的方式来处理 job 的 queue。
      const job = globalScheduler.jobs.shift() as Job
      await job.propagator()
    }
    isRunning = false
  } catch (error) {
    console.error({ who: "run", error })
  }
}
