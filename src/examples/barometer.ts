import { Cell } from "../cell/index.js"
import { Interval } from "../interval/Interval.js"
import { definePropagator } from "../propagator/index.js"
import { constant, multiplier, product, squarer } from "../propagators/index.js"

// h = (1 / 2) * g * t * t

export const fallDuration = definePropagator(2, (t, h) => {
  const g = constant(Interval(9.789, 9.832))()
  multiplier(constant(1 / 2)(), multiplier(g, squarer(t)), h)
})

export const similarTriangles = definePropagator(4, (sa, ha, sb, hb) => {
  const ratio = Cell()
  product(sa, ratio, ha)
  product(sb, ratio, hb)
})
