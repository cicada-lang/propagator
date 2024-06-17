import { cell } from "../cell/index.js"
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

export const fahrenheitCelsius = definePropagator(2, (f, c) => {
  const a = cell<number>()
  sum(a, constant(32)(), f)
  const b = cell<number>()
  product(b, constant(9)(), constant(5)())
  product(a, b, c)
})

export const celsiusKelvin = definePropagator(2, (c, k) => {
  sum(c, constant(273.15)(), k)
})
