import { type Cell } from "../cell/index.ts"

// # 关于为什么要重载函数作用
// 我们重载函数作用，使得可以部分恢复树状的 expression 语法。

export type PropagatorDefinition = {
  arity: number
  (...args: Array<Cell<any>>): void
}

type Propagator1Definition = {
  arity: 1
  (arg1: Cell<any>): void
  (): Cell<any>
}

type Propagator2Definition = {
  arity: 2
  (arg1: Cell<any>, arg2: Cell<any>): void
  (arg1: Cell<any>): Cell<any>
  (): [Cell<any>, Cell<any>]
}

type Propagator3Definition = {
  arity: 3
  (arg1: Cell<any>, arg2: Cell<any>, arg3: Cell<any>): void
  (arg1: Cell<any>, arg2: Cell<any>): Cell<any>
  (arg1: Cell<any>): [Cell<any>, Cell<any>]
  (): [Cell<any>, Cell<any>, Cell<any>]
}

type Propagator4Definition = {
  arity: 4
  (arg1: Cell<any>, arg2: Cell<any>, arg3: Cell<any>, arg4: Cell<any>): void
  (arg1: Cell<any>, arg2: Cell<any>, arg3: Cell<any>): Cell<any>
  (arg1: Cell<any>, arg2: Cell<any>): [Cell<any>, Cell<any>]
  (arg1: Cell<any>): [Cell<any>, Cell<any>, Cell<any>]
  (): [Cell<any>, Cell<any>, Cell<any>, Cell<any>]
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
