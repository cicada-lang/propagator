import { definePropagator } from "../propagator/index.js"
import { adder, constantCell, divider } from "../propagators/index.js"

// h = (g + x/g) / 2

export const heronStep = definePropagator(3, (x, g, h) => {
  divider(adder(g, divider(x, g)), constantCell(2), h)
})
