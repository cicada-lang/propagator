import { isNothing, nothing } from "../cell/Nothing.js"
import { defineHandler } from "../generic/index.js"
import { flatten, fmap } from "../monad/index.js"
import { isFunction } from "../utils/isFunction.js"

defineHandler(fmap, [isFunction, isNothing], (f, ma) => nothing)

defineHandler(flatten, [isNothing], (mma) => nothing)
