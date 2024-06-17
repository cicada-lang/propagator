import type {
  GenericDefinition,
  GenericHandler,
  Predicate,
} from "./GenericDefinition.js"

export function defineHandler(
  definition: GenericDefinition,
  predicates: Array<Predicate>,
  fn: (...args: Array<any>) => any,
): void {
  const handler: GenericHandler = (...args) => {
    return fn(...args)
  }

  handler.predicates = predicates

  definition.handlers.push(handler)
}
