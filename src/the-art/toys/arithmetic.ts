import { definePrimitive, definePropagator } from "../propagator/index.js"

export const adder = definePrimitive(3, (x, y) => x + y)
export const subtractor = definePrimitive(3, (x, y) => x - y)
export const multiplier = definePrimitive(3, (x, y) => x * y)
export const divider = definePrimitive(3, (x, y) => x / y)

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
