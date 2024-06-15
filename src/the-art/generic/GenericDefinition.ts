export type Predicate = (x: any) => boolean

export type Handler = {
  predicates: Array<Predicate>
  (...args: Array<unknown>): unknown
}

export type GenericDefinition = {
  (...args: Array<unknown>): unknown
  default?: (...args: Array<unknown>) => unknown
  handlers: Array<Handler>
}

export function matchPredicates(
  predicates: Array<Predicate>,
  args: Array<unknown>,
): boolean {
  if (predicates.length !== args.length) {
    return false
  }

  for (const [i, arg] of args.entries()) {
    const predicate = predicates[i]
    if (!predicate(arg)) {
      return false
    }
  }

  return true
}
