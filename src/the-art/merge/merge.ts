import { isNothing } from "../cell/Nothing.js"
import { defineGeneric } from "../generic/defineGeneric.js"

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
  default: (content, increment) => {
    if (isNothing(increment)) {
      return content
    }

    if (isNothing(content)) {
      return increment
    }

    if (increment === content) {
      return content
    } else {
      return theContradiction
    }
  },
})
