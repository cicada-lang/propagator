import { isNothing, nothing } from "../cell/Nothing.js"
import { defineHandler } from "../generic/index.js"
import { fmap, join } from "../monad/index.js"
import { isFunction } from "../utils/isFunction.js"

defineHandler(fmap, [isFunction, isNothing], (f, mx) => nothing)
defineHandler(join, [isNothing], (mmx) => nothing)
