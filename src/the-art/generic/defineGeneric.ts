import {
  matchPredicates,
  type GenericDefinition,
  type Handler,
} from "./GenericDefinition.js"

export function defineGeneric(options: {
  default?: (...args: Array<unknown>) => unknown
}): GenericDefinition {
  const handlers: Array<Handler> = []
  const definition: GenericDefinition = (...args) => {
    for (const handler of handlers) {
      if (matchPredicates(handler.predicates, args)) {
        return handler(...args)
      }
    }

    if (options.default) {
      return options.default(...args)
    } else {
      console.error({ who: "GenericDefinition", definition, args })
      throw new Error(`[GenericDefinition] Unhandled args and not default.`)
    }
  }

  definition.default = options.default
  definition.handlers = handlers

  return definition
}
