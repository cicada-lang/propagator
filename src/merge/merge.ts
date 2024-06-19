import { isNothing } from "../cell/index.js"
import { defineGeneric, defineHandler } from "../generic/index.js"
import {
  intervalContainsNumber,
  intervalEqual,
  intervalIntersect,
  intervalIsEmpty,
  isInterval,
} from "../interval/index.js"
import { isNumber } from "../utils/isNumber.js"
import { theContradiction } from "./Contradiction.js"

export const merge = defineGeneric({
  default: (content, increment) =>
    increment === content ? content : theContradiction,
})

function isAnything(x: any): true {
  return true
}

defineHandler(merge, [isAnything, isNothing], (content, increment) => content)
defineHandler(merge, [isNothing, isAnything], (content, increment) => increment)

defineHandler(merge, [isInterval, isInterval], (content, increment) => {
  const newInterval = intervalIntersect(content, increment)
  if (intervalEqual(newInterval, content)) return content
  if (intervalEqual(newInterval, increment)) return increment
  if (intervalIsEmpty(newInterval)) return theContradiction
  return newInterval
})

defineHandler(merge, [isInterval, isNumber], (content, increment) =>
  intervalContainsNumber(content, increment) ? increment : theContradiction,
)

defineHandler(merge, [isNumber, isInterval], (content, increment) =>
  intervalContainsNumber(increment, content) ? content : theContradiction,
)
