import { Belief } from "../belief/index.js"
import { type Reason, type Reasons } from "../reason/index.js"

export function isBeliefBelieved<A>(belief: Belief<A>): boolean {
  return Array.from(belief.reasons).every(isReasonBelieved)
}

export const globelReasonBlackList: Reasons = new Set()

function isReasonBelieved(reason: Reason): boolean {
  return !globelReasonBlackList.has(reason)
}

export function kickOut(reason: Reason): void {
  globelReasonBlackList.add(reason)
}

export function bringIn(reason: Reason): void {
  globelReasonBlackList.delete(reason)
}
