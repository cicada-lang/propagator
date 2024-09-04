import { defineHandler } from "../generic/index.js"
import { isNumber } from "../utils/isNumber.js"
import { merge } from "./merge.js"
import { theMergeConflict } from "./MergeConflict.js"

defineHandler(merge, [isNumber, isNumber], (content, increment) =>
  increment === content ? content : theMergeConflict,
)
