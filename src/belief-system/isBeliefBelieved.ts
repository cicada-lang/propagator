import { Belief } from "../belief/index.js"
import { type Reason, type Reasons } from "../reason/index.js"
import { scheduleAllEverScheduledPropagators } from "../scheduler/index.js"

export function isBeliefBelieved<A>(belief: Belief<A>): boolean {
  return Array.from(belief.reasons).every(isReasonBelieved)
}

export const globelReasonBlackList: Reasons = new Set()

function isReasonBelieved(reason: Reason): boolean {
  return !globelReasonBlackList.has(reason)
}

// Manually changing the black list violates the network’s
// monotonicity assumptions, so all propagators whose inputs might
// change under them need to be alerted when this happens.
//
// Altering all the propagators indiscriminately is a conservative
// approximation that works reasonably for a single process
// simulation.

export function kickOut(reason: Reason): void {
  if (!globelReasonBlackList.has(reason)) {
    globelReasonBlackList.add(reason)
    scheduleAllEverScheduledPropagators()
  }
}

export function bringIn(reason: Reason): void {
  if (globelReasonBlackList.has(reason)) {
    globelReasonBlackList.delete(reason)
    scheduleAllEverScheduledPropagators()
  }
}
