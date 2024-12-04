import {
  beliefSystemMerge,
  isBeliefSystem,
  toBeliefSystem,
} from "../belief-system/index.ts"
import { isBelief } from "../belief/index.ts"
import { defineHandler } from "../generic/index.ts"
import { coercing } from "../utils/coercing.ts"
import { isPrimitive } from "./isPrimitive.ts"
import { merge } from "./merge.ts"

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
