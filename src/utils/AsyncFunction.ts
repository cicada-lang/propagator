const anAsyncFunction = async () => {}

export const AsyncFunction = anAsyncFunction.constructor

export function isAsyncFunction(fn: Function): fn is typeof anAsyncFunction {
  return fn instanceof AsyncFunction
}
