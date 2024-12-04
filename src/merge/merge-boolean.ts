import { theContradiction } from "../contradiction/index.ts"
import { defineHandler } from "../generic/index.ts"
import { isBoolean } from "../utils/isBoolean.ts"
import { merge } from "./merge.ts"

defineHandler(merge, [isBoolean, isBoolean], (content, increment) =>
  increment === content ? content : theContradiction,
)
