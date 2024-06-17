import { repeatApply } from "../../utils/repeatApply.js"
import { cell, type Cell } from "../cell/index.js"
import type { PropagatorDefinitionWithFixedArity } from "./PropagatorDefinition.js"

export function definePropagator<A extends number>(
  arity: A,
  fn: (...args: Array<Cell<any>>) => void,
): PropagatorDefinitionWithFixedArity<A> {
  const definition = (...args: Array<Cell<any>>) => {
    if (args.length === arity) {
      fn(...args)
    } else if (args.length === arity - 1) {
      const output = cell()
      fn(...args, output)
      return output
    } else if (args.length < arity - 1) {
      const outputs = repeatApply(arity - args.length, () => cell(), [])
      fn(...args, ...outputs)
      return outputs
    } else {
      console.error({
        who: "PropagatorDefinition",
        constroctor: "definePropagator",
        definition,
        args,
      })
      throw new Error(
        `[PropagatorDefinition] number of arguments ${args.length} exceed arity plus one: ${arity + 1}`,
      )
    }
  }

  definition.arity = arity

  return definition as any as PropagatorDefinitionWithFixedArity<A>
}
