import { isBelief } from "../belief/index.js"
import { defineGeneric } from "../generic/defineGeneric.js"
import { defineHandler } from "../generic/index.js"
import { isMergeConflict } from "./MergeConflict.js"

export const detectMergeConflict = defineGeneric({
  default: isMergeConflict,
})

// If it so happens that two supported values contradict each other,
// we want to return an object that will be recognized as representing
// a contradiction, but will retain the information about which
// premises were involved in the contradiction. It is convenient to do
// that by using the cell’s generic contradiction test; that way we
// can let v&s-merge return a supported value whose value is a
// contradiction, and whose support can carry information about why
// the contradiction arose.

defineHandler(detectMergeConflict, [isBelief], (belief) =>
  detectMergeConflict(belief.value),
)
