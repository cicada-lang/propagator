import { defineGeneric, defineHandler } from "../generic/index.js"
import { isBoolean } from "../utils/isBoolean.js"

export const not = defineGeneric()
defineHandler(not, [isBoolean], (x) => !x)

export const and = defineGeneric()
defineHandler(and, [isBoolean, isBoolean], (x) => x && y)

export const or = defineGeneric()
defineHandler(or, [isBoolean, isBoolean], (x, y) => x || y)
