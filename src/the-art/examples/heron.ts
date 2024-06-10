import { makeCell, type Cell } from "../cell/index.js"

// h = (g + x/g) / 2

export function heronStep(x: Cell<number>, g: Cell<number>, h: Cell<number>) {
  const x_div_g = makeCell<number>()
  const g_add_x_div_g = makeCell<number>()
  const two = makeCell<number>()
  divider(x, g, x_div_g)
  adder(g, x_div_g, g_add_x_div_g)
  constant(2, two)
  divider(g_add_x_div_g, two, h)
}

export function divider(x: Cell<number>, y: Cell<number>, z: Cell<number>) {
  //
}

export function adder(x: Cell<number>, y: Cell<number>, z: Cell<number>) {
  //
}

export function constant<T>(value: T, x: Cell<T>) {
  //
}
