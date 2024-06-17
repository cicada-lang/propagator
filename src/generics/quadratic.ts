import { defineGeneric } from "../generic/defineGeneric.js"
import { defineHandler } from "../generic/defineHandler.js"
import { isNumber } from "../utils/isNumber.js"

export const square = defineGeneric()
defineHandler(square, [isNumber], (x) => x * x)

export const sqrt = defineGeneric()
defineHandler(sqrt, [isNumber], (x) => Math.sqrt(x))
