import { Cell } from "../cell/index.ts"
import { Interval } from "../interval/index.ts"
import { definePropagator } from "../propagator/index.ts"
import { constantCell, product, quadratic } from "../propagators/index.ts"

// h = (1 / 2) * g * t * t

export const fallDuration = definePropagator(2, (t, h) => {
  const g = constantCell(Interval(9.789, 9.832))
  product(constantCell(1 / 2), product(g, quadratic(t)), h)
})

export const similarTriangles = definePropagator(4, (sa, ha, sb, hb) => {
  const ratio = Cell()
  product(sa, ratio, ha)
  product(sb, ratio, hb)
})
