import { defineHandler } from "../generic/index.js"
import { theMergeConflict } from "../merge-conflict/index.js"
import { isNumber } from "../utils/isNumber.js"
import { merge } from "./merge.js"

defineHandler(merge, [isNumber, isNumber], (content, increment) =>
  increment === content ? content : theMergeConflict,
)
