import { add, div, mul, sub } from "../generics/index.ts"
import { definePrimitive, definePropagator } from "../propagator/index.ts"

export const adder = definePrimitive(3, add)
export const subtractor = definePrimitive(3, sub)
export const multiplier = definePrimitive(3, mul)
export const divider = definePrimitive(3, div)

export const sum = definePropagator(3, (x, y, z) => {
  adder(x, y, z)
  subtractor(z, x, y)
  subtractor(z, y, x)
})

export const product = definePropagator(3, (x, y, z) => {
  multiplier(x, y, z)
  divider(z, x, y)
  divider(z, y, x)
})
