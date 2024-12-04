import { Cell } from "../cell/index.ts"
import { repeatApply } from "../utils/repeatApply.ts"
import type { PropagatorDefinitionWithFixedArity } from "./PropagatorDefinition.ts"

export function definePropagator<A extends number>(
  arity: A,
  fn: (...args: Array<Cell<any>>) => void,
): PropagatorDefinitionWithFixedArity<A> {
  const definition = (...args: Array<Cell<any>>) => {
    if (args.length === arity) {
      fn(...args)
    } else if (args.length === arity - 1) {
      const output = Cell()
      fn(...args, output)
      return output
    } else if (args.length < arity - 1) {
      const outputs = repeatApply(arity - args.length, () => Cell(), [])
      fn(...args, ...outputs)
      return outputs
    } else {
      const message = `Number of arguments ${args.length} exceed arity plus one: ${arity + 1}`
      console.error({
        who: "PropagatorDefinition",
        constroctor: "definePropagator",
        message,
        definition,
        args,
      })
      throw new Error(`[PropagatorDefinition] ${message}`)
    }
  }

  definition.arity = arity

  return definition as any as PropagatorDefinitionWithFixedArity<A>
}
