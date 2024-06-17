import { defineGeneric } from "../generic/defineGeneric.js"
import { defineHandler } from "../generic/defineHandler.js"
import { intervalSqrt, intervalSquare, isInterval } from "../interval/index.js"
import { isNumber } from "../utils/isNumber.js"

export const square = defineGeneric()
defineHandler(square, [isNumber], (x) => x * x)
defineHandler(square, [isInterval], intervalSquare)

export const sqrt = defineGeneric()
defineHandler(sqrt, [isNumber], Math.sqrt)
defineHandler(sqrt, [isInterval], intervalSqrt)
