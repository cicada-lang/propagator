import { Cell, addPropagator, put } from "../cell/index.js"
import { naryFmap } from "../monad/index.js"
import "../monads/nothing-monad.js"
import "../monads/supported-monad.js"
import { schedule } from "../scheduler/index.js"
import type { MaybePromise } from "../utils/MaybePromise.js"
import { log } from "../utils/log.js"
import { repeatApply } from "../utils/repeatApply.js"
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
// - 也许不应该用不带参数的 closure 来实现 propagator，
//   应该用定义时所提供的函数本身，运行时才提供参数。
// 但是这个名字太长了，并且为了与深嵌入的 API 一致，
// 我们用了 define 这个前缀，因为深嵌入的 API 可能是：
//   definePrimitive(mod, name, arity, fn)
// 另外 propagator definition 其实是 propagator constructor，
// 但是叫 definition 也没问题，并且能和深嵌入一致。

export function definePrimitive<A extends number>(
  arity: A,
  fn: (...args: Array<any>) => MaybePromise<any>,
): PropagatorDefinitionWithFixedArity<A> {
  const liftedFn = lift(fn)

  const definition = (...args: Array<Cell<any>>) => {
    // 注意，在下面的实现中，只需要 watch 函数的 inputs，
    // output cell 的变化并不应该导致代表函数的 propagator 重新运行。
    if (args.length === arity) {
      const inputs = args.slice(0, args.length - 1)
      const output = args[args.length - 1]

      watch(inputs, async () => {
        put(output, await liftedFn(...inputs))
      })
    } else if (args.length === arity - 1) {
      const inputs = args
      const output = Cell()

      watch(inputs, async () => {
        put(output, await liftedFn(...inputs))
      })

      return output
    } else if (args.length < arity - 1) {
      const paddings = repeatApply(arity - args.length - 1, () => Cell(), [])
      const inputs = [...args, ...paddings]
      const output = Cell()

      watch(inputs, async () => {
        put(output, await liftedFn(...inputs))
      })

      return [...paddings, output]
    } else {
      const message = `The number of arguments ${args.length} exceed arity plus one: ${arity + 1}`
      log({
        who: "PropagatorDefinition",
        constroctor: "definePrimitive",
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

function lift(
  fn: (...args: Array<any>) => MaybePromise<any>,
): (...args: Array<Cell<any>>) => MaybePromise<any> {
  fn = naryFmap(fn)

  return (...inputs) => fn(...inputs.map((input) => input.content))
}

function watch(cells: Array<Cell<any>>, propagator: Propagator): void {
  for (const cell of cells) {
    addPropagator(cell, propagator)
  }

  schedule([propagator])
}
