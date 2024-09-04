import { Belief } from "../belief/index.js"
import type { Reasons } from "../reason/index.js"

export function isBeliefBelieved<A>(belief: Belief<A>): boolean {
  return Array.from(belief.reasons).every(isReasonBelieved)
}

const globelReasonBlackList: Reasons = new Set()

function isReasonBelieved(entry: string): boolean {
  return !globelReasonBlackList.has(entry)
}
