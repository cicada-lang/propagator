import { defineGeneric, defineHandler } from "../generic/index.ts"
import {
  intervalAdd,
  intervalDiv,
  intervalMul,
  intervalSub,
  isInterval,
  toInterval,
} from "../interval/index.ts"
import { coercing } from "../utils/coercing.ts"
import { isNumber } from "../utils/isNumber.ts"

export const add = defineGeneric()
defineHandler(add, [isNumber, isNumber], (x, y) => x + y)
defineHandler(add, [isInterval, isInterval], intervalAdd)
defineHandler(add, [isInterval, isNumber], coercing(toInterval, intervalAdd))
defineHandler(add, [isNumber, isInterval], coercing(toInterval, intervalAdd))

export const sub = defineGeneric()
defineHandler(sub, [isNumber, isNumber], (x, y) => x - y)
defineHandler(sub, [isInterval, isInterval], intervalSub)
defineHandler(sub, [isInterval, isNumber], coercing(toInterval, intervalSub))
defineHandler(sub, [isNumber, isInterval], coercing(toInterval, intervalSub))

export const mul = defineGeneric()
defineHandler(mul, [isNumber, isNumber], (x, y) => x * y)
defineHandler(mul, [isInterval, isInterval], intervalMul)
defineHandler(mul, [isInterval, isNumber], coercing(toInterval, intervalMul))
defineHandler(mul, [isNumber, isInterval], coercing(toInterval, intervalMul))

export const div = defineGeneric()
defineHandler(div, [isNumber, isNumber], (x, y) => x / y)
defineHandler(div, [isInterval, isInterval], intervalDiv)
defineHandler(div, [isInterval, isNumber], coercing(toInterval, intervalDiv))
defineHandler(div, [isNumber, isInterval], coercing(toInterval, intervalDiv))
