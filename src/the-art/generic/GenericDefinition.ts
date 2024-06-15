export type Predicate = (x: any) => boolean

export type GenericHandler = {
  predicates: Array<Predicate>
  (...args: Array<any>): any
}

export type GenericDefinition = {
  (...args: Array<any>): any
  default?: (...args: Array<any>) => any
  handlers: Array<GenericHandler>
}

export function matchPredicates(
  predicates: Array<Predicate>,
  args: Array<any>,
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
