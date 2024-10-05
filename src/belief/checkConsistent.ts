import { isContradictory } from "../contradiction/isContradictory.js"
import { processNogood } from "../nogood/index.js"
import type { Nothing } from "../nothing/index.js"
import { isBelief, type Belief } from "./Belief.js"

export function checkConsistent(belief: Nothing | Belief<any>): void {
  if (isBelief(belief)) {
    if (isContradictory(belief)) {
      processNogood(belief.reasons)
    }
  }
}
