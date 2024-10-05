import { isContradictory } from "../contradiction/index.js"
import { defineHandler } from "../generic/index.js"
import { nothing } from "../nothing/index.js"
import { isFunction } from "../utils/isFunction.js"
import { flatten, fmap } from "./monad.js"

defineHandler(fmap, [isFunction, isContradictory], (f, ma) => nothing)

defineHandler(flatten, [isContradictory], (mma) => nothing)
