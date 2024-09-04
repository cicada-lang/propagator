import { isNothing, nothing } from "../cell/Nothing.js"
import { defineHandler } from "../generic/index.js"
import { isFunction } from "../utils/isFunction.js"
import { flatten, fmap } from "./monad.js"

defineHandler(fmap, [isFunction, isNothing], (f, ma) => nothing)

defineHandler(flatten, [isNothing], (mma) => nothing)
