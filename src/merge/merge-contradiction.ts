import { isContradiction, theContradiction } from "../contradiction/index.js"
import { defineHandler } from "../generic/index.js"
import { isAnything } from "./isAnything.js"
import { merge } from "./merge.js"

defineHandler(
  merge,
  [isAnything, isContradiction],
  (content, increment) => theContradiction,
)
defineHandler(
  merge,
  [isContradiction, isAnything],
  (content, increment) => theContradiction,
)
