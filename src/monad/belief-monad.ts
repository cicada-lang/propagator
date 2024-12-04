import { Belief, isBelief } from "../belief/index.ts"
import { defineHandler } from "../generic/index.ts"
import { isNothing, nothing } from "../nothing/index.ts"
import { isFunction } from "../utils/isFunction.ts"
import { setUnion } from "../utils/set/index.ts"
import { bind, flatten, fmap } from "./monad.ts"

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
