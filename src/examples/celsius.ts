import { Cell } from "../cell/index.ts"
import { definePropagator } from "../propagator/index.ts"
import {
  constantCell,
  divider,
  multiplier,
  product,
  subtractor,
  sum,
} from "../propagators/index.ts"

// c = (f - 32) * 5/9

export const fahrenheitToCelsius = definePropagator(2, (f, c) => {
  multiplier(
    subtractor(f, constantCell(32)),
    divider(constantCell(5), constantCell(9)),
    c,
  )
})

export const fahrenheitCelsius = definePropagator(2, (f, c) => {
  const a = Cell()
  sum(a, constantCell(32), f)
  const b = Cell()
  product(b, constantCell(9), constantCell(5))
  product(a, b, c)
})

export const celsiusKelvin = definePropagator(2, (c, k) => {
  sum(c, constantCell(273.15), k)
})
