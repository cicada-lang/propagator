import { defineHandler } from "../generic/index.js"
import { isMergeConflict, theMergeConflict } from "../merge-conflict/index.js"
import { isAnything } from "./isAnything.js"
import { merge } from "./merge.js"

defineHandler(
  merge,
  [isAnything, isMergeConflict],
  (content, increment) => theMergeConflict,
)
defineHandler(
  merge,
  [isMergeConflict, isAnything],
  (content, increment) => theMergeConflict,
)
