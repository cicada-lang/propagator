import { sqrt, square } from "../generics/index.js"
import { definePrimitive } from "../propagator/definePrimitive.js"
import { definePropagator } from "../propagator/definePropagator.js"

export const squarer = definePrimitive(2, square)
export const sqrter = definePrimitive(2, sqrt)

export const quadratic = definePropagator(2, (r, s) => {
  squarer(r, s)
  sqrter(s, r)
})
