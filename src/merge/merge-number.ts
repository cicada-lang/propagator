import { theContradiction } from "../contradiction/index.js"
import { defineHandler } from "../generic/index.js"
import { isNumber } from "../utils/isNumber.js"
import { merge } from "./merge.js"

defineHandler(merge, [isNumber, isNumber], (content, increment) =>
  increment === content ? content : theContradiction,
)
