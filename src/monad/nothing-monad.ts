import { defineHandler } from "../generic/index.ts"
import { isNothing, nothing } from "../nothing/index.ts"
import { isFunction } from "../utils/isFunction.ts"
import { flatten, fmap } from "./monad.ts"

defineHandler(fmap, [isFunction, isNothing], (f, ma) => nothing)

defineHandler(flatten, [isNothing], (mma) => nothing)
