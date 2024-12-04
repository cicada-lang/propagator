import { defineGeneric } from "../generic/index.ts"

// ((A) -> B, M(A)) -> M(B)
export const fmap = defineGeneric({ default: (f, ma) => f(ma) })

// (M(M(A))) -> M(A)
export const flatten = defineGeneric({ default: (mma) => mma })

// (M(A), (A) -> M(B)) -> M(B)
export const bind = (ma: any, f: (x: any) => any) => flatten(fmap(f, ma))

// ((A0, A1, ...) -> B) -> (M(A0), M(A1), ...) -> M(B)
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
