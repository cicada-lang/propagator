import type { Reasons } from "../reason/index.js"
import { globalSchedulerAbort } from "../scheduler/index.js"

export function processNogood(reasons: Reasons): void {
  const who = "processNogood"
  console.log({ who, reasons })
  globalSchedulerAbort()
}
