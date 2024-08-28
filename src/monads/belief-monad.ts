import { isNothing, nothing } from "../cell/Nothing.js"
import { Belief, isBelief } from "../dependency/index.js"
import { defineHandler } from "../generic/index.js"
import { bind, fmap, join } from "../monad/index.js"
import { setUnion } from "../utils/Set.js"
import { isFunction } from "../utils/isFunction.js"

defineHandler(fmap, [isFunction, isBelief], (f, ma: Belief<any>) =>
  Belief(bind(ma.value, f), ma.reason),
)

defineHandler(join, [isBelief], (mma) => mma)
defineHandler(
  join,
  [(mma) => isBelief(mma) && isNothing(mma.value)],
  (mma) => nothing,
)
defineHandler(join, [(mma) => isBelief(mma) && isBelief(mma.value)], (mma) =>
  join(Belief(mma.value.value, setUnion(mma.reason, mma.value.reason))),
)
