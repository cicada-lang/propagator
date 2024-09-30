import { not } from "../generics/boolean.js"
import { definePrimitive } from "../propagator/index.js"

export const inverter = definePrimitive(2, not)
