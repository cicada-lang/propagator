export type Contradiction = {
  "@type": "Contradiction"
}

export const theContradiction: Contradiction = {
  "@type": "Contradiction",
}

export function isContradiction(x: any): x is Contradiction {
  return x === theContradiction
}
