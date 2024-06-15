import { repeatApply } from "../../utils/repeatApply.js"
import { createCell, type Cell } from "../cell/index.js"
import type { PropagatorDefinitionWithFixedArity } from "./PropagatorDefinition.js"

export function definePropagator<A extends number>(
  arity: A,
  fn: (...args: Array<Cell<unknown>>) => void,
): PropagatorDefinitionWithFixedArity<A> {
  const definition = (...args: Array<Cell<unknown>>) => {
    if (args.length === arity) {
      fn(...args)
    } else if (args.length === arity - 1) {
      const output = createCell()
      fn(...args, output)
      return output
    } else if (args.length < arity - 1) {
      const outputs = repeatApply(arity - args.length, () => createCell(), [])
      fn(...args, ...outputs)
      return outputs
    } else {
      console.error({ who: "PropagatorDefinition", definition, args })
      throw new Error(
        `[PropagatorDefinition] number of arguments ${args.length} exceed arity plus one: ${arity + 1}`,
      )
    }
  }

  definition.arity = arity

  return definition as unknown as PropagatorDefinitionWithFixedArity<A>
}
