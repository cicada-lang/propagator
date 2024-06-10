import {
  addPropagator,
  broadcast,
  makeCell,
  type Cell,
  type Propagator,
} from "../cell/index.js"

// h = (g + x/g) / 2

export function heronStep(
  x: Cell<number>,
  g: Cell<number>,
  h: Cell<number>,
): void {
  watch([x, g], () => {
    const x_div_g = makeCell<number>()
    const g_add_x_div_g = makeCell<number>()
    const two = makeCell<number>()
    divider(x, g, x_div_g)
    adder(g, x_div_g, g_add_x_div_g)
    constant(2, two)
    divider(g_add_x_div_g, two, h)
  })
}

export function watch(
  cells: Array<Cell<unknown>>,
  propagator: Propagator,
): void {
  for (const cell of cells) {
    addPropagator(cell, propagator)
  }

  broadcast([propagator])
}

export function divider(
  x: Cell<number>,
  y: Cell<number>,
  z: Cell<number>,
): void {
  //
}

export function adder(x: Cell<number>, y: Cell<number>, z: Cell<number>): void {
  //
}

export function constant<T>(value: T, x: Cell<T>): void {
  //
}

export type PropagatorConstructor = (...args: Array<Cell<unknown>>) => void

export function propagatorConstructorFromFunction(
  fn: (...args: Array<unknown>) => unknown,
  arity: number,
): PropagatorConstructor {
  return (...args) => {
    //
  }
}
