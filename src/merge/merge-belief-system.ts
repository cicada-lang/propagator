import {
  beliefSystemMerge,
  isBeliefSystem,
  toBeliefSystem,
} from "../belief-system/index.js"
import { isBelief } from "../belief/index.js"
import { defineHandler } from "../generic/index.js"
import { coercing } from "../utils/coercing.js"
import { isPrimitive } from "./isPrimitive.js"
import { merge } from "./merge.js"

defineHandler(merge, [isBeliefSystem, isBeliefSystem], beliefSystemMerge)
defineHandler(
  merge,
  [(x) => isPrimitive(x) || isBelief(x), isBeliefSystem],
  coercing(toBeliefSystem, beliefSystemMerge),
)
defineHandler(
  merge,
  [isBeliefSystem, (x) => isPrimitive(x) || isBelief(x)],
  coercing(toBeliefSystem, beliefSystemMerge),
)
