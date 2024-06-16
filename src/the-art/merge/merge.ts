import { isNothing } from "../cell/Nothing.js"
import { defineGeneric } from "../generic/defineGeneric.js"
import { defineHandler } from "../generic/defineHandler.js"
import { theContradiction } from "./Contradiction.js"

export const merge = defineGeneric({
  default: (content, increment) => {
    return increment === content ? content : theContradiction
  },
})

function isAnything(x: any): true {
  return true
}

defineHandler(merge, [isAnything, isNothing], (content, increment) => content)
defineHandler(merge, [isNothing, isAnything], (content, increment) => increment)
