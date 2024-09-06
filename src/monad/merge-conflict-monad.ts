import { defineHandler } from "../generic/index.js"
import { detectMergeConflict } from "../merge-conflict/index.js"
import { nothing } from "../nothing/index.js"
import { isFunction } from "../utils/isFunction.js"
import { flatten, fmap } from "./monad.js"

defineHandler(fmap, [isFunction, detectMergeConflict], (f, ma) => nothing)

defineHandler(flatten, [detectMergeConflict], (mma) => nothing)
