import { beliefMerge, isBelief, toBelief } from "../belief/index.js"
import { defineHandler } from "../generic/index.js"
import { coercing } from "../utils/coercing.js"
import { isPrimitive } from "./isPrimitive.js"
import { merge } from "./merge.js"

defineHandler(merge, [isBelief, isBelief], beliefMerge)
defineHandler(merge, [isPrimitive, isBelief], coercing(toBelief, beliefMerge))
defineHandler(merge, [isBelief, isPrimitive], coercing(toBelief, beliefMerge))
