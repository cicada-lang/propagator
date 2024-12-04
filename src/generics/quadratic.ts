import { defineGeneric } from "../generic/defineGeneric.ts"
import { defineHandler } from "../generic/defineHandler.ts"
import { intervalSqrt, intervalSquare, isInterval } from "../interval/index.ts"
import { isNumber } from "../utils/isNumber.ts"

export const square = defineGeneric()
defineHandler(square, [isNumber], (x) => x * x)
defineHandler(square, [isInterval], intervalSquare)

export const sqrt = defineGeneric()
defineHandler(sqrt, [isNumber], Math.sqrt)
defineHandler(sqrt, [isInterval], intervalSqrt)
