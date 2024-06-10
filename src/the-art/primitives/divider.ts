import { definePrimitive } from "../propagator/definePrimitive.js"

export const divider = definePrimitive(2, (x, y) => x / y)
