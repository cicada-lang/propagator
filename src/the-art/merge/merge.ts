const theContradiction = {
  "@type": "Contradiction",
}

export function isContradiction(x: any): boolean {
  return x === theContradiction
}

export function merge(content: any, increment: any): any {
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
