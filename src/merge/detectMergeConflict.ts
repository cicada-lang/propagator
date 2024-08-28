import { isBelief } from "../belief/index.js"
import { defineGeneric } from "../generic/defineGeneric.js"
import { defineHandler } from "../generic/index.js"
import { theMergeConflict } from "./MergeConflict.js"

export const detectMergeConflict = defineGeneric({
  default: (x) => x === theMergeConflict,
})

defineHandler(detectMergeConflict, [isBelief], (belief) =>
  detectMergeConflict(belief.value),
)
