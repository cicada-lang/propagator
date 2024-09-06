import { defineHandler } from "../generic/index.js"
import { isMergeConflict } from "../merge-conflict/index.js"
import { nothing } from "../nothing/index.js"
import { isFunction } from "../utils/isFunction.js"
import { flatten, fmap } from "./monad.js"

defineHandler(fmap, [isFunction, isMergeConflict], (f, ma) => nothing)

defineHandler(flatten, [isMergeConflict], (mma) => nothing)
