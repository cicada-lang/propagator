import { isNothing, nothing } from "../cell/Nothing.js"
import { Supported, isSupported } from "../dependency/index.js"
import { defineHandler } from "../generic/index.js"
import { bind, fmap, join } from "../monad/index.js"
import { setUnion } from "../utils/Set.js"
import { isFunction } from "../utils/isFunction.js"

defineHandler(fmap, [isFunction, isSupported], (f, ma: Supported<any>) =>
  Supported(bind(ma.value, f), ma.supports),
)

defineHandler(join, [isSupported], (ma) => ma)
defineHandler(
  join,
  [(ma) => isSupported(ma) && isNothing(ma.value)],
  (ma) => nothing,
)
defineHandler(
  join,
  [(mma) => isSupported(mma) && isSupported(mma.value)],
  (mma) => join(mma.value.value, setUnion(mma.supports, mma.value.supports)),
)
