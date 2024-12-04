import { and, not, or } from "../generics/index.ts"
import { definePrimitive } from "../propagator/index.ts"

export const inverter = definePrimitive(2, not)
export const conjoiner = definePrimitive(3, and)
export const disjoiner = definePrimitive(3, or)
