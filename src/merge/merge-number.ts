import { theContradiction } from "../contradiction/index.ts"
import { defineHandler } from "../generic/index.ts"
import { isNumber } from "../utils/isNumber.ts"
import { merge } from "./merge.ts"

defineHandler(merge, [isNumber, isNumber], (content, increment) =>
  increment === content ? content : theContradiction,
)
