import { detectMergeConflict } from "../merge/detectMergeConflict.js"
import { clearScheduledPropagators } from "../scheduler/schedule.js"
import { log } from "../utils/log.js"
import type { Belief } from "./Belief.js"

export function beliefCheckConsistent<A>(belief: Belief<A>): void {
  if (detectMergeConflict(belief)) {
    const who = "beliefCheckConsistent"
    const message = "inconsistent belief"
    log({ who, message, belief })
    clearScheduledPropagators()
  }
}
