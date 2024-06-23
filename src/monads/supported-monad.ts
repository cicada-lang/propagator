import { isNothing, nothing } from "../cell/Nothing.js"
import { Supported, isSupported } from "../dependency/index.js"
import { defineHandler } from "../generic/index.js"
import { bind, fmap, join } from "../monad/index.js"
import { setUnion } from "../utils/Set.js"
import { isFunction } from "../utils/isFunction.js"

defineHandler(fmap, [isFunction, isSupported], (f, ma: Supported<any>) =>
  Supported(bind(ma.content, f), ma.supports),
)

defineHandler(join, [isSupported], (ma) => ma)
defineHandler(
  join,
  [(ma) => isSupported(ma) && isNothing(ma.content)],
  (ma) => nothing,
)
defineHandler(
  join,
  [(mma) => isSupported(mma) && isSupported(mma.content)],
  (mma) =>
    join(mma.content.content, setUnion(mma.supports, mma.content.supports)),
)
