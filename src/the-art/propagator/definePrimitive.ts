import { repeatApply } from "../../utils/repeatApply.js"
import { addContent, content, createCell, type Cell } from "../cell/index.js"
import { type PropagatorDefinitionWithFixedArity } from "./PropagatorDefinition.js"
import { watch } from "./watch.js"

// 我们知道所有的 primitive 都是函数，
// 因此所构建的 propagator 有多个输入和一个输出。
// 注意，这里的 arity 代表 propagator 的参数个数，
// 而不是函数的输入参数的个数。

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
        arity - args.length - 1,
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
