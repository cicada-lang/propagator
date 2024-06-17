import type { MaybePromise } from "../../utils/MaybePromise.js"
import { repeatApply } from "../../utils/repeatApply.js"
import {
  addContent,
  addPropagator,
  cell,
  content,
  isNothing,
  nothing,
  type Cell,
} from "../cell/index.js"
import { schedule } from "../scheduler/index.js"
import type { Propagator } from "./Propagator.js"
import { type PropagatorDefinitionWithFixedArity } from "./PropagatorDefinition.js"

// # 关于 arity 的含义
// 我们知道所有的 primitive 都是函数，
// 因此所构建的 propagator 有多个输入和一个输出。
// 注意，这里的 arity 代表 propagator 的参数个数，
// 而不是函数的输入参数的个数。

// # 关于 API 的命名
// 作为浅嵌入，这里 `definePrimitive` 其实做的是：
//   "create propagator constructor from native function"
// 因为真正的 propagator 类似 subscriber，
// 是可以不带参数就调用的 closure。
// 但是这个名字太长了，并且为了与深嵌入的 API 一致，
// 我们用了 define 这个前缀，因为深嵌入的 API 可能是：
//   definePrimitive(mod, name, arity, fn)
// 另外 propagator definition 其实是 propagator constructor，
// 但是叫 definition 也没问题，并且能和深嵌入一致。

export function definePrimitive<A extends number>(
  arity: A,
  fn: (...args: Array<any>) => MaybePromise<any>,
): PropagatorDefinitionWithFixedArity<A> {
  const definition = (...args: Array<Cell<any>>) => {
    // 注意，在下面的实现中，只需要 watch 函数的 inputs，
    // output cell 的变化并不应该导致代表函数的 propagator 重新运行。
    if (args.length === arity) {
      const inputs = args.slice(0, args.length - 1)
      const output = args[args.length - 1]

      watch(inputs, async () => {
        const liftedFn = skipIncompleteInputs(fn)
        const result = await liftedFn(...inputs.map(content))
        addContent(output, result)
      })
    } else if (args.length === arity - 1) {
      const inputs = args
      const output = cell()

      watch(inputs, async () => {
        const liftedFn = skipIncompleteInputs(fn)
        const result = await liftedFn(...inputs.map(content))
        addContent(output, result)
      })

      return output
    } else if (args.length < arity - 1) {
      const paddings = repeatApply(arity - args.length - 1, () => cell(), [])
      const inputs = [...args, ...paddings]
      const output = cell()

      watch(inputs, async () => {
        const liftedFn = skipIncompleteInputs(fn)
        const result = await liftedFn(...inputs.map(content))
        addContent(output, result)
      })

      return [...paddings, output]
    } else {
      console.error({
        who: "PropagatorDefinition",
        constroctor: "definePrimitive",
        definition,
        args,
      })
      throw new Error(
        `[PropagatorDefinition] The number of arguments ${args.length} exceed arity plus one: ${arity + 1}`,
      )
    }
  }

  definition.arity = arity

  return definition as any as PropagatorDefinitionWithFixedArity<A>
}

// # 参数不全时的处理
// 函数只能在参数齐全的情况下才能作用，
// 因此代表函数的 propagator，
// 也只能在作为输入的 cells 中的值齐全时才能作用。
// - 在 "The Art" 中这个函数叫 `lift-to-cell-contents`，
//   在博士论文中，这个函数叫 `handling-nothings`
//   也许这个函数的命名应该来自 "skip when inputs are incomplete" 这一短语。
// - 也许我们不应该用 undefined 来代表 cell 中没有值，
//   因为这样的话，JS 中带有 optional arguments 的函数，
//   就没法被转化为 propagator 了。

function skipIncompleteInputs(
  fn: (...args: Array<any>) => MaybePromise<any>,
): (...args: Array<any>) => MaybePromise<any> {
  return async (...args) => {
    if (args.find(isNothing)) {
      return nothing
    } else {
      return await fn(...args)
    }
  }
}

function watch(cells: Array<Cell<any>>, propagator: Propagator): void {
  for (const cell of cells) {
    addPropagator(cell, propagator)
  }

  schedule([propagator])
}
