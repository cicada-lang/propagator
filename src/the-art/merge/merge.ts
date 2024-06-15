import { defineGeneric } from "../generic/defineGeneric.js"

export type Contradiction = {
  "@type": "Contradiction"
}

const theContradiction: Contradiction = {
  "@type": "Contradiction",
}

export function isContradiction(x: any): boolean {
  return x === theContradiction
}

export const merge = defineGeneric({
  default: (content, increment) => {
    if (increment === undefined) {
      return content
    }

    if (content === undefined) {
      return increment
    }

    if (increment === content) {
      return content
    } else {
      return theContradiction
    }
  },
})
