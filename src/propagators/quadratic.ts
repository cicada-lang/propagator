import { sqrt, square } from "../generics/index.ts"
import { definePrimitive, definePropagator } from "../propagator/index.ts"

export const squarer = definePrimitive(2, square)
export const sqrter = definePrimitive(2, sqrt)

export const quadratic = definePropagator(2, (r, s) => {
  squarer(r, s)
  sqrter(s, r)
})
