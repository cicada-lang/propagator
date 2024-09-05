import { defineHandler } from "../generic/index.js"
import {
  intervalContainsNumber,
  intervalEqual,
  intervalIntersect,
  intervalIsEmpty,
  isInterval,
} from "../interval/index.js"
import { theMergeConflict } from "../merge-conflict/index.js"
import { isNumber } from "../utils/isNumber.js"
import { merge } from "./merge.js"

defineHandler(merge, [isInterval, isInterval], (content, increment) => {
  const newInterval = intervalIntersect(content, increment)
  if (intervalEqual(newInterval, content)) return content
  if (intervalEqual(newInterval, increment)) return increment
  if (intervalIsEmpty(newInterval)) return theMergeConflict
  return newInterval
})

defineHandler(merge, [isNumber, isInterval], (content, increment) =>
  intervalContainsNumber(increment, content) ? content : theMergeConflict,
)

defineHandler(merge, [isInterval, isNumber], (content, increment) =>
  intervalContainsNumber(content, increment) ? increment : theMergeConflict,
)
