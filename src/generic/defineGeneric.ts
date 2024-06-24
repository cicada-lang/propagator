import { log } from "../utils/log.js"
import {
  matchPredicates,
  type GenericDefinition,
  type GenericHandler,
} from "./GenericDefinition.js"

export function defineGeneric(
  options: {
    default?: (...args: Array<any>) => any
  } = {
    default: undefined,
  },
): GenericDefinition {
  const handlers: Array<GenericHandler> = []
  const definition: GenericDefinition = (...args) => {
    // 当两各 handler 都适用时，后加入的优先。
    for (const handler of handlers.slice().reverse()) {
      if (matchPredicates(handler.predicates, args)) {
        return handler(...args)
      }
    }

    if (options.default) {
      return options.default(...args)
    } else {
      const message = "Unhandled args and not default."
      log({
        kind: "Error",
        who: "GenericDefinition",
        constroctor: "defineGeneric",
        message,
        definition,
        args,
      })

      throw new Error(`[GenericDefinition] ${message}`)
    }
  }

  definition.default = options.default
  definition.handlers = handlers

  return definition
}
