import { sqrt, square } from "../generics/index.js"
import { definePrimitive, definePropagator } from "../propagator/index.js"

export const squarer = definePrimitive(2, square)
export const sqrter = definePrimitive(2, sqrt)

export const quadratic = definePropagator(2, (r, s) => {
  squarer(r, s)
  sqrter(s, r)
})
