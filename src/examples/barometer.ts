import { Cell } from "../cell/index.js"
import { Interval } from "../interval/index.js"
import { definePropagator } from "../propagator/index.js"
import { constant, product, quadratic } from "../propagators/index.js"

// h = (1 / 2) * g * t * t

export const fallDuration = definePropagator(2, (t, h) => {
  const g = constant(Interval(9.789, 9.832))()
  product(constant(1 / 2)(), product(g, quadratic(t)), h)
})

export const similarTriangles = definePropagator(4, (sa, ha, sb, hb) => {
  const ratio = Cell()
  product(sa, ratio, ha)
  product(sb, ratio, hb)
})
