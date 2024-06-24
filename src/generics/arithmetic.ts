import { defineGeneric, defineHandler } from "../generic/index.js"
import {
  exactInterval,
  intervalAdd,
  intervalDiv,
  intervalMul,
  intervalSub,
  isInterval,
  toInterval,
} from "../interval/index.js"
import { coercing } from "../utils/coercing.js"
import { isNumber } from "../utils/isNumber.js"

export const add = defineGeneric()
defineHandler(add, [isNumber, isNumber], (x, y) => x + y)
defineHandler(add, [isInterval, isInterval], intervalAdd)
defineHandler(add, [isInterval, isNumber], coercing(toInterval, intervalAdd))
defineHandler(add, [isNumber, isInterval], coercing(toInterval, intervalAdd))

export const sub = defineGeneric()
defineHandler(sub, [isNumber, isNumber], (x, y) => x - y)
defineHandler(sub, [isInterval, isInterval], intervalSub)
defineHandler(sub, [isInterval, isNumber], (x, y) =>
  intervalSub(x, exactInterval(y)),
)
defineHandler(sub, [isNumber, isInterval], (x, y) =>
  intervalSub(exactInterval(x), y),
)

export const mul = defineGeneric()
defineHandler(mul, [isNumber, isNumber], (x, y) => x * y)
defineHandler(mul, [isInterval, isInterval], intervalMul)
defineHandler(mul, [isInterval, isNumber], (x, y) =>
  intervalMul(x, exactInterval(y)),
)
defineHandler(mul, [isNumber, isInterval], (x, y) =>
  intervalMul(exactInterval(x), y),
)

export const div = defineGeneric()
defineHandler(div, [isNumber, isNumber], (x, y) => x / y)
defineHandler(div, [isInterval, isInterval], intervalDiv)
defineHandler(div, [isInterval, isNumber], (x, y) =>
  intervalDiv(x, exactInterval(y)),
)
defineHandler(div, [isNumber, isInterval], (x, y) =>
  intervalDiv(exactInterval(x), y),
)
