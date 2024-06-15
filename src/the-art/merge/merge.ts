import { isNothing } from "../cell/Nothing.js"
import { defineGeneric } from "../generic/defineGeneric.js"
import { defineHandler } from "../generic/defineHandler.js"

export type Contradiction = {
  "@type": "Contradiction"
}

const theContradiction: Contradiction = {
  "@type": "Contradiction",
}

export function isContradiction(x: any): x is Contradiction {
  return x === theContradiction
}

export const merge = defineGeneric({
  default: (content, increment) =>
    increment === content ? content : theContradiction,
})

defineHandler(merge, [isAnything, isNothing], (content, increment) => content)
defineHandler(merge, [isNothing, isAnything], (content, increment) => increment)

export function isAnything(x: any): true {
  return true
}
