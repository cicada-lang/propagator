import { isNothing } from "../cell/Nothing.js"
import { defineGeneric } from "../generic/defineGeneric.js"
import { defineHandler } from "../generic/defineHandler.js"
import { intervalIntersect } from "../interval/arithmetic.js"
import { isInterval } from "../interval/index.js"
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

defineHandler(merge, [isInterval, isInterval], (content, increment) =>
  intervalIntersect(content, increment),
)
