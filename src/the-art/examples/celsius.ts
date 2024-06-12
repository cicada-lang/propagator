import {
  constant,
  divider,
  multiplier,
  subtractor,
} from "../primitives/index.js"
import { definePropagator } from "../propagator/index.js"

// c = (f - 32) * 5/9

export const fahrenheitToCelsius = definePropagator(2, (f, c) => {
  multiplier(
    subtractor(f, constant(32)()),
    divider(constant(5)(), constant(9)()),
    c,
  )
})
