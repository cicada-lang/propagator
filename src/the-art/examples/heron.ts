import { type Cell } from "../cell/index.js"
import { adder } from "../primitives/adder.js"
import { constant } from "../primitives/constant.js"
import { divider } from "../primitives/divider.js"

// h = (g + x/g) / 2

export const heronStep = (
  x: Cell<number>,
  g: Cell<number>,
  h: Cell<number>,
) => {
  divider(adder(g, divider(x, g)), constant(2)(), h)
}

// export const heronStep = createPropagator((x, g, h) => {
//   divider(adder(g, divider(x, g)), constant(2), h)
// })
