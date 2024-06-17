import { defineGeneric } from "../generic/defineGeneric.js"
import { defineHandler } from "../generic/defineHandler.js"
import { isNumber } from "../utils/isNumber.js"

export const add = defineGeneric()
defineHandler(add, [isNumber, isNumber], (x, y) => x + y)

export const sub = defineGeneric()
defineHandler(sub, [isNumber, isNumber], (x, y) => x - y)

export const mul = defineGeneric()
defineHandler(mul, [isNumber, isNumber], (x, y) => x * y)

export const div = defineGeneric()
defineHandler(div, [isNumber, isNumber], (x, y) => x / y)
