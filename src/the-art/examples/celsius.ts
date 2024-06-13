import { createCell } from "../cell/index.js"
import { definePropagator } from "../propagator/index.js"
import {
  constant,
  divider,
  multiplier,
  product,
  subtractor,
  sum,
} from "../toys/index.js"

// c = (f - 32) * 5/9

export const fahrenheitToCelsius = definePropagator(2, (f, c) => {
  multiplier(
    subtractor(f, constant(32)()),
    divider(constant(5)(), constant(9)()),
    c,
  )
})

export const fahrenheitAndCelsius = definePropagator(2, (f, c) => {
  const a = createCell<number>()
  sum(a, constant(32)(), f)
  const b = createCell<number>()
  product(b, constant(9)(), constant(5)())
  product(a, b, c)
})
