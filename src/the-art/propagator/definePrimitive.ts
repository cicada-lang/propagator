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

// 我们知道所有的 primitive 都是函数，
// 因此如此构建的 propagator，
// 多个输入和一个输出，
// 对于函数来说 arity 代表输入参数的个数。

type PrimitiveDefinition = {
  arity: number
  (...args: Array<Cell<unknown>>): void
}

type Primitive1Definition = {
  arity: 1
  (arg1: Cell<unknown>): void
  (): Cell<unknown>
}

type Primitive2Definition = {
  arity: 2
  (arg1: Cell<unknown>, arg2: Cell<unknown>): void
  (arg1: Cell<unknown>): Cell<unknown>
  (): [Cell<unknown>, Cell<unknown>]
}

type Primitive3Definition = {
  arity: 3
  (arg1: Cell<unknown>, arg2: Cell<unknown>, arg3: Cell<unknown>): void
  (arg1: Cell<unknown>, arg2: Cell<unknown>): Cell<unknown>
  (arg1: Cell<unknown>): [Cell<unknown>, Cell<unknown>]
  (): [Cell<unknown>, Cell<unknown>, Cell<unknown>]
}

type Primitive4Definition = {
  arity: 4
  (
    arg1: Cell<unknown>,
    arg2: Cell<unknown>,
    arg3: Cell<unknown>,
    arg4: Cell<unknown>,
  ): void
  (arg1: Cell<unknown>, arg2: Cell<unknown>, arg3: Cell<unknown>): Cell<unknown>
  (arg1: Cell<unknown>, arg2: Cell<unknown>): [Cell<unknown>, Cell<unknown>]
  (arg1: Cell<unknown>): [Cell<unknown>, Cell<unknown>, Cell<unknown>]
  (): [Cell<unknown>, Cell<unknown>, Cell<unknown>, Cell<unknown>]
}

export function definePrimitive<A extends number>(
  arity: A,
  fn: (...args: Array<any>) => any,
): A extends 1
  ? Primitive1Definition
  : A extends 2
    ? Primitive2Definition
    : A extends 3
      ? Primitive3Definition
      : A extends 4
        ? Primitive4Definition
        : PrimitiveDefinition {
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
  return definition as any
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
