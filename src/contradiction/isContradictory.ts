import { isBelief } from "../belief/index.ts"
import { defineGeneric } from "../generic/defineGeneric.ts"
import { defineHandler } from "../generic/index.ts"
import { isContradiction } from "./Contradiction.ts"

export const isContradictory = defineGeneric({
  default: isContradiction,
})

// If it so happens that two supported values contradict each other,
// we want to return an object that will be recognized as representing
// a contradiction, but will retain the information about which
// premises were involved in the contradiction. It is convenient to do
// that by using the cell’s generic contradiction test; that way we
// can let v&s-merge return a supported value whose value is a
// contradiction, and whose support can carry information about why
// the contradiction arose.

defineHandler(isContradictory, [isBelief], (belief) =>
  isContradictory(belief.value),
)
