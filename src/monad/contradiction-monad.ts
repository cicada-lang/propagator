import { isContradictory } from "../contradiction/index.ts"
import { defineHandler } from "../generic/index.ts"
import { nothing } from "../nothing/index.ts"
import { isFunction } from "../utils/isFunction.ts"
import { flatten, fmap } from "./monad.ts"

defineHandler(fmap, [isFunction, isContradictory], (f, ma) => nothing)

defineHandler(flatten, [isContradictory], (mma) => nothing)
