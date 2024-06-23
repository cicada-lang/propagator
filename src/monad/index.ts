import { defineGeneric } from "../generic/index.js"

export const fmap = defineGeneric({ default: (f, mx) => f(mx) })
export const join = defineGeneric({ default: (mmx) => mmx })
export const bind = (mx: any, f: (x: any) => any) => join(fmap(f, mx))
