import { makeCell, type Cell } from "../cell/index.js"
import { propagatorConstructorFromFunction } from "../propagator/propagatorConstructorFromFunction.js"

export const divider = propagatorConstructorFromFunction((x, y) => x / y)
export const adder = propagatorConstructorFromFunction((x, y) => x + y)

export function constant<T>(value: T): (x: Cell<T>) => void {
  return propagatorConstructorFromFunction(() => value)
}

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
