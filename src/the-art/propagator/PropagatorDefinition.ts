import { type Cell } from "../cell/index.js"

// 我们重载函数作用，使得可以部分恢复树状的 expression 语法。

export type PropagatorDefinition = {
  arity: number
  (...args: Array<Cell<unknown>>): void
}

type Propagator1Definition = {
  arity: 1
  (arg1: Cell<unknown>): void
  (): Cell<unknown>
}

type Propagator2Definition = {
  arity: 2
  (arg1: Cell<unknown>, arg2: Cell<unknown>): void
  (arg1: Cell<unknown>): Cell<unknown>
  (): [Cell<unknown>, Cell<unknown>]
}

type Propagator3Definition = {
  arity: 3
  (arg1: Cell<unknown>, arg2: Cell<unknown>, arg3: Cell<unknown>): void
  (arg1: Cell<unknown>, arg2: Cell<unknown>): Cell<unknown>
  (arg1: Cell<unknown>): [Cell<unknown>, Cell<unknown>]
  (): [Cell<unknown>, Cell<unknown>, Cell<unknown>]
}

type Propagator4Definition = {
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

export type PropagatorDefinitionWithFixedArity<A extends number> = A extends 1
  ? Propagator1Definition
  : A extends 2
    ? Propagator2Definition
    : A extends 3
      ? Propagator3Definition
      : A extends 4
        ? Propagator4Definition
        : PropagatorDefinition
