import {
  addContent,
  addPropagator,
  broadcast,
  content,
  createCell,
  type Cell,
} from "../cell/index.js"
import type { Propagator } from "./Propagator.js"

// 我们知道所有的 primitive 都是函数，
// 因此如此构建的 propagator，
// 多个输入和一个输出，
// 对于函数来说 arity 代表输入参数的个数。

type Primitive2Definition = {
  (x0: Cell<unknown>, x1: Cell<unknown>, ret: Cell<unknown>): void
  (x0: Cell<unknown>, x1: Cell<unknown>): Cell<unknown>
}

export function definePrimitive2(
  fn: (...args: Array<any>) => any,
): Primitive2Definition {
  const definition = (...args: Array<Cell<unknown>>) => {
    if (args.length === 3) {
      const [x0, x1, ret] = args
      const inputs = [x0, x1]
      const output = ret
      const liftedFn = liftToCellContents(fn)
      watch(inputs, () => {
        addContent(output, liftedFn(...inputs.map(content)))
      })
    }

    if (args.length === 2) {
      const [x0, x1] = args
      const inputs = [x0, x1]
      const output = createCell()
      const liftedFn = liftToCellContents(fn)
      watch(inputs, () => {
        addContent(output, liftedFn(...inputs.map(content)))
      })

      return output
    }
  }

  return definition as Primitive2Definition
}

type PrimitiveDefinition = {
  (...args: Array<Cell<unknown>>): void
}

export function definePrimitive(
  fn: (...args: Array<any>) => any,
): PrimitiveDefinition {
  const definition: PrimitiveDefinition = (...args) => {
    const inputs = args.slice(0, args.length - 1)
    const output = args[args.length - 1]
    const liftedFn = liftToCellContents(fn)
    watch(inputs, () => {
      addContent(output, liftedFn(...inputs.map(content)))
    })
  }

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
