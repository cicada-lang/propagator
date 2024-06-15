export type Contradiction = {
  "@type": "Contradiction"
}

const theContradiction: Contradiction = {
  "@type": "Contradiction",
}

export function isContradiction(x: any): boolean {
  return x === theContradiction
}

export function merge<T>(content: any, increment: any): T | Contradiction {
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
}
