import { defineGeneric, defineHandler } from "../generic/index.ts"
import { isBoolean } from "../utils/isBoolean.ts"

export const not = defineGeneric({
  default: (...args) => {
    console.log("hi", args)
  },
})
defineHandler(not, [isBoolean], (x) => !x)

export const and = defineGeneric()
defineHandler(and, [isBoolean, isBoolean], (x, y) => x && y)

export const or = defineGeneric()
defineHandler(or, [isBoolean, isBoolean], (x, y) => x || y)
