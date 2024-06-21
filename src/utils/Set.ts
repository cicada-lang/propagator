export function setUnion<T>(x: Set<T>, y: Set<T>): Set<T> {
  return new Set([...x, ...y])
}

// setIntersection
// setDifference
// setSymmetricDifference

export function setIsSubsetOf<T>(x: Set<T>, y: Set<T>): boolean {
  for (const e of x) {
    if (!y.has(e)) {
      return false
    }
  }

  return true
}

export function setIsSupersetOf<T>(x: Set<T>, y: Set<T>): boolean {
  return setIsSubsetOf(y, x)
}

export function setIsDisjointFrom(x: Set<T>, y: Set<T>): boolean {
  for (const e of x) {
    if (y.has(e)) {
      return false
    }
  }

  for (const e of y) {
    if (x.has(e)) {
      return false
    }
  }

  return true
}
