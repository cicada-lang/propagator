import { definePropagator } from "../propagator/index.js"
import { adder, constant, divider } from "../toys/index.js"

// h = (g + x/g) / 2

export const heronStep = definePropagator(3, (x, g, h) => {
  divider(adder(g, divider(x, g)), constant(2)(), h)
})
