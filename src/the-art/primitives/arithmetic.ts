import { definePrimitive } from "../propagator/definePrimitive.js"

export const adder = definePrimitive(3, (x, y) => x + y)
export const subtractor = definePrimitive(3, (x, y) => x - y)
export const multiplier = definePrimitive(3, (x, y) => x * y)
export const divider = definePrimitive(3, (x, y) => x / y)
