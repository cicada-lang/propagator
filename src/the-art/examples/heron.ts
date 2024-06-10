import {
  addContent,
  addPropagator,
  broadcast,
  content,
  makeCell,
  type Cell,
  type Propagator,
} from "../cell/index.js"

export const divider = propagatorConstructorFromFunction((x, y) => x / y)
export const adder = propagatorConstructorFromFunction((x, y) => x + y)

export function constant<T>(value: T): (x: Cell<T>) => void {
  return propagatorConstructorFromFunction(() => value)
}

export type PropagatorConstructor = (...args: Array<Cell<unknown>>) => void

export function propagatorConstructorFromFunction(
  fn: (...args: Array<any>) => any,
): PropagatorConstructor {
  return (...args) => {
    const inputs = args.slice(0, args.length - 1)
    const output = args[args.length - 1]
    const liftedFn = liftToCellContents(fn)
    watch(inputs, () => {
      addContent(output, liftedFn(...inputs.map(content)))
    })
  }
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

function liftToCellContents(
  fn: (...args: Array<any>) => any,
): (...args: Array<any>) => any {
  return (...args) => {
    if (args.includes(undefined)) {
      return undefined
    } else {
      return fn(...args)
    }
  }
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
