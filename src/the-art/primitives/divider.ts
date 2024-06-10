import { definePrimitivePropagator } from "../propagator/definePrimitivePropagator.js"

export const divider = definePrimitivePropagator(2, (x, y) => x / y)
