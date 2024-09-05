import { detectMergeConflict } from "../merge/detectMergeConflict.js"
import { clearScheduledPropagators } from "../scheduler/schedule.js"
import { log } from "../utils/log.js"

export function checkConsistent(value: any): void {
  if (detectMergeConflict(value)) {
    const who = "checkConsistent"
    const message = "inconsistent value"
    log({ who, message, value })
    clearScheduledPropagators()
  }
}
