import {
  addContent,
  addPropagator,
  broadcast,
  content,
  type Cell,
} from "../cell/index.js"
import type { Propagator } from "./Propagator.js"

// 我们知道所有的 primitive 都是函数，
// 因此如此构建的 propagator，
// 多个输入和一个输出，
// 对于函数来说 arity 代表输入参数的个数。

type Primitive2Definition = {
  (...args: Array<Cell<unknown>>): void
  arity: number
}

export function definePrimitive2(
  arity: number,
  fn: (...args: Array<any>) => any,
): Primitive2Definition {
  const definition: Primitive2Definition = (...args) => {
    const inputs = args.slice(0, args.length - 1)
    const output = args[args.length - 1]
    const liftedFn = liftToCellContents(fn)
    watch(inputs, () => {
      addContent(output, liftedFn(...inputs.map(content)))
    })
  }

  definition.arity = arity

  return definition
}

export function watch(
  cells: Array<Cell<unknown>>,
  propagator: Propagator,
): void {
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
