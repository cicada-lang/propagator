import { defineGeneric } from "../generic/defineGeneric.js"
import { defineHandler } from "../generic/defineHandler.js"
import {
  intervalAdd,
  intervalDiv,
  intervalMul,
  isInterval,
} from "../interval/index.js"
import { isNumber } from "../utils/isNumber.js"

export const add = defineGeneric()
defineHandler(add, [isNumber, isNumber], (x, y) => x + y)
defineHandler(add, [isInterval, isInterval], intervalAdd)

export const sub = defineGeneric()
defineHandler(sub, [isNumber, isNumber], (x, y) => x - y)
defineHandler(sub, [isInterval, isInterval], intervalMul)

export const mul = defineGeneric()
defineHandler(mul, [isNumber, isNumber], (x, y) => x * y)
defineHandler(mul, [isInterval, isInterval], intervalMul)

export const div = defineGeneric()
defineHandler(div, [isNumber, isNumber], (x, y) => x / y)
defineHandler(div, [isInterval, isInterval], intervalDiv)
