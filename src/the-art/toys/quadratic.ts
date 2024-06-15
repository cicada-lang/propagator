import { definePrimitive } from "../propagator/definePrimitive.js"
import { definePropagator } from "../propagator/definePropagator.js"

export const squarer = definePrimitive(2, (x) => x * x)
export const sqrter = definePrimitive(2, (x) => Math.sqrt(x))

export const quadratic = definePropagator(2, (r, s) => {
  squarer(r, s)
  sqrter(s, r)
})
