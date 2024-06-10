import { definePrimitive } from "../propagator/definePrimitive.js"

export const adder = definePrimitive(2, (x, y) => x + y)
