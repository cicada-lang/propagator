import { propagatorConstructorFromFunction } from "../propagator/propagatorConstructorFromFunction.js"

export const adder = propagatorConstructorFromFunction(2, (x, y) => x + y)
