import { and, not, or } from "../generics/index.js"
import { definePrimitive } from "../propagator/index.js"

export const inverter = definePrimitive(2, not)
export const conjoiner = definePrimitive(3, and)
export const disjoiner = definePrimitive(3, or)
