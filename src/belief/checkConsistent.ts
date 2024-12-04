import { isContradictory } from "../contradiction/isContradictory.ts"
import { processNogood } from "../nogood/index.ts"
import type { Nothing } from "../nothing/index.ts"
import { isBelief, type Belief } from "./Belief.ts"

export function checkConsistent(belief: Nothing | Belief<any>): void {
  if (isBelief(belief)) {
    if (isContradictory(belief)) {
      processNogood(belief.reasons)
    }
  }
}
