import { isContradiction, theContradiction } from "../contradiction/index.ts"
import { defineHandler } from "../generic/index.ts"
import { isAnything } from "./isAnything.ts"
import { merge } from "./merge.ts"

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
