import { createCell, type Cell } from "../cell/index.js"
import { adder } from "../primitives/adder.js"
import { constant } from "../primitives/constant.js"
import { divider } from "../primitives/divider.js"

// h = (g + x/g) / 2

export function heronStep(
  x: Cell<number>,
  g: Cell<number>,
  h: Cell<number>,
): void {
  const two = createCell<number>()
  constant(2)(two)
  divider(adder(g, divider(x, g)), two, h)
}

// export function heronStep(
//   x: Cell<number>,
//   g: Cell<number>,
//   h: Cell<number>,
// ): void {
//   const two = createCell<number>()
//   constant(2)(two)
//   divider(apply(adder, [g, apply(divider, [x, g])]), two, h)
// }

// export const heronStep = createPropagator((x, g, h) => {
//   divider(apply(adder, [g, apply(divider, [x, g])]), apply(constant(2)), h)
// })

// export const heronStep = createPropagator((x, g, h) => {
//   divider(adder(g, divider(x, g)), constant(2), h)
// })
