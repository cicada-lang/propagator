import { defineHandler } from "../generic/index.ts"
import { isNothing } from "../nothing/index.ts"
import { isAnything } from "./isAnything.ts"
import { merge } from "./merge.ts"

defineHandler(merge, [isAnything, isNothing], (content, increment) => content)
defineHandler(merge, [isNothing, isAnything], (content, increment) => increment)
