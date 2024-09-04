import { Belief, isBelief } from "../belief/index.js"
import { defineHandler } from "../generic/index.js"
import { isNothing, nothing } from "../nothing/index.js"
import { isFunction } from "../utils/isFunction.js"
import { setUnion } from "../utils/set/index.js"
import { bind, flatten, fmap } from "./monad.js"

defineHandler(fmap, [isFunction, isBelief], (f, ma) =>
  Belief(bind(ma.value, f), ma.reasons),
)

defineHandler(flatten, [isBelief], (mma) => mma)
defineHandler(
  flatten,
  [(mma) => isBelief(mma) && isNothing(mma.value)],
  (mma) => nothing,
)
defineHandler(flatten, [(mma) => isBelief(mma) && isBelief(mma.value)], (mma) =>
  flatten(Belief(mma.value.value, setUnion(mma.reasons, mma.value.reasons))),
)
