import { makeCell, type Cell } from "../cell/index.js"
import { adder } from "../primitives/adder.js"
import { constant } from "../primitives/constant.js"
import { divider } from "../primitives/divider.js"

// h = (g + x/g) / 2

export function heronStep(
  x: Cell<number>,
  g: Cell<number>,
  h: Cell<number>,
): void {
  const x_div_g = makeCell<number>()
  const g_add_x_div_g = makeCell<number>()
  const two = makeCell<number>()
  divider(x, g, x_div_g)
  adder(g, x_div_g, g_add_x_div_g)
  constant(2)(two)
  divider(g_add_x_div_g, two, h)
}

// export function heronStep(
//   x: Cell<number>,
//   g: Cell<number>,
//   h: Cell<number>,
// ): void {
//   const two = makeCell<number>()
//   constant(2)(two)
//   divider(apply(adder, [g, apply(divider, [x, g])]), two, h)
// }
