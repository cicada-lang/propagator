import { defineHandler } from "../generic/index.js"
import { isNothing, nothing } from "../nothing/index.js"
import { isFunction } from "../utils/isFunction.js"
import { flatten, fmap } from "./monad.js"

defineHandler(fmap, [isFunction, isNothing], (f, ma) => nothing)

defineHandler(flatten, [isNothing], (mma) => nothing)
