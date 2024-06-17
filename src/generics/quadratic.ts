import { defineGeneric } from "../generic/defineGeneric.js"
import { defineHandler } from "../generic/defineHandler.js"
import { intervalSqrt, intervalSquare, isInterval } from "../interval/index.js"
import { isNumber } from "../utils/isNumber.js"

export const square = defineGeneric()
defineHandler(square, [isNumber], (x) => x * x)
defineHandler(square, [isInterval], (x) => intervalSquare)

export const sqrt = defineGeneric()
defineHandler(sqrt, [isNumber], (x) => Math.sqrt(x))
defineHandler(square, [isInterval], (x) => intervalSqrt)
