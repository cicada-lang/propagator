import { theContradiction } from "../contradiction/index.ts"
import { defineHandler } from "../generic/index.ts"
import {
  intervalContainsNumber,
  intervalEqual,
  intervalIntersect,
  intervalIsEmpty,
  isInterval,
} from "../interval/index.ts"
import { isNumber } from "../utils/isNumber.ts"
import { merge } from "./merge.ts"

defineHandler(merge, [isInterval, isInterval], (content, increment) => {
  const newInterval = intervalIntersect(content, increment)
  if (intervalEqual(newInterval, content)) return content
  if (intervalEqual(newInterval, increment)) return increment
  if (intervalIsEmpty(newInterval)) return theContradiction
  return newInterval
})

defineHandler(merge, [isNumber, isInterval], (content, increment) =>
  intervalContainsNumber(increment, content) ? content : theContradiction,
)

defineHandler(merge, [isInterval, isNumber], (content, increment) =>
  intervalContainsNumber(content, increment) ? increment : theContradiction,
)
