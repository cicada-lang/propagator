import { propagatorConstructorFromFunction } from "../propagator/propagatorConstructorFromFunction.js"

export const divider = propagatorConstructorFromFunction((x, y) => x / y)
