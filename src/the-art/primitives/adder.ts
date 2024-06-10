import { definePrimitivePropagator } from "../propagator/definePrimitivePropagator.js"

export const adder = definePrimitivePropagator(2, (x, y) => x + y)
