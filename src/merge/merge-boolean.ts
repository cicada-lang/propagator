import { defineHandler } from "../generic/index.js"
import { theMergeConflict } from "../merge-conflict/index.js"
import { isBoolean } from "../utils/isBoolean.js"
import { merge } from "./merge.js"

defineHandler(merge, [isBoolean, isBoolean], (content, increment) =>
  increment === content ? content : theMergeConflict,
)
