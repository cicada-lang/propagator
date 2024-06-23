import { defineGeneric } from "../generic/index.js"

// (f: (A) -> B, ma: M(A)) -> M(B)
export const fmap = defineGeneric({ default: (f, ma) => f(ma) })

// (mma: M(M(A))) -> M(A)
export const join = defineGeneric({ default: (mma) => mma })

// (ma: M(A), f: (A) -> M(B)) -> M(B)
export const bind = (ma: any, f: (x: any) => any) => join(fmap(f, ma))

// (f: (A0, A1, ...) -> B) -> (M(A0), M(A1), ...) -> M(B)
export function naryFmap(
  f: (...args: Array<any>) => any,
): (...margs: Array<any>) => any {
  return (...margs) => {
    function recur(margs: Array<any>, f: (...args: Array<any>) => any): any {
      if (margs.length === 0) return f()

      return bind(margs[0], (arg) =>
        recur(margs.slice(1), (...restArgs) => f(arg, ...restArgs)),
      )
    }

    return recur(margs, f)
  }
}
