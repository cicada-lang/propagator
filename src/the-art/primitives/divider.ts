import { propagatorConstructorFromFunction } from "../propagator/propagatorConstructorFromFunction.js"

export const divider = propagatorConstructorFromFunction(2, (x, y) => x / y)
