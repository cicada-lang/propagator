import { propagatorConstructorFromFunction } from "../propagator/propagatorConstructorFromFunction.js"

export const adder = propagatorConstructorFromFunction((x, y) => x + y)
