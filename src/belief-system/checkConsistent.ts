import { detectMergeConflict } from "../merge-conflict/detectMergeConflict.js"

import { clearScheduledPropagators } from "../scheduler/schedule.js"
import { log } from "../utils/log.js"

export function checkConsistent(value: any): void {
  return

  if (detectMergeConflict(value)) {
    const who = "checkConsistent"
    const message = "Inconsistent value"
    log({ who, message, value })
    clearScheduledPropagators()
  }
}
