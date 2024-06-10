import { repeatApply } from "../../utils/repeatApply.js"
import {
  addContent,
  addPropagator,
  broadcast,
  content,
  createCell,
  type Cell,
} from "../cell/index.js"
import type { Propagator } from "./Propagator.js"
import { type PropagatorDefinitionWithFixedArity } from "./PropagatorDefinition.js"

// 我们知道所有的 primitive 都是函数，
// 因此如此构建的 propagator，
// 多个输入和一个输出。
// 注意，这里的 arity 代表 propagator 的参数个数，
// 而不是函数的输入参数的个数。

export function definePrimitive<A extends number>(
  arity: A,
  fn: (...args: Array<any>) => any,
): PropagatorDefinitionWithFixedArity<A> {
  const definition = (...args: Array<Cell<unknown>>) => {
    if (args.length === arity) {
      const inputs = args.slice(0, args.length - 1)
      const output = args[args.length - 1]

      const liftedFn = liftToCellContents(fn)
      watch(inputs, () => {
        addContent(output, liftedFn(...inputs.map(content)))
      })
    } else if (args.length === arity - 1) {
      const inputs = args
      const output = createCell()

      const liftedFn = liftToCellContents(fn)
      watch(inputs, () => {
        addContent(output, liftedFn(...inputs.map(content)))
      })

      return output
    } else if (args.length < arity - 1) {
      const paddings = repeatApply(
        args.length - arity + 1,
        () => createCell(),
        [],
      )
      const inputs = [...args, ...paddings]
      const output = createCell()

      const liftedFn = liftToCellContents(fn)
      watch(inputs, () => {
        addContent(output, liftedFn(...inputs.map(content)))
      })

      return [...paddings, output]
    } else {
      throw new Error(
        `[definePrimitive] number of arguments ${args.length} exceed arity plus one: ${arity + 1}`,
      )
    }
  }

  definition.arity = arity

  return definition as unknown as PropagatorDefinitionWithFixedArity<A>
}

function watch(cells: Array<Cell<unknown>>, propagator: Propagator): void {
  for (const cell of cells) {
    addPropagator(cell, propagator)
  }

  broadcast([propagator])
}

function liftToCellContents(
  fn: (...args: Array<any>) => any,
): (...args: Array<any>) => any {
  return (...args) => {
    if (args.includes(undefined)) {
      return undefined
    } else {
      return fn(...args)
    }
  }
}
