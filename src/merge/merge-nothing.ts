import { defineHandler } from "../generic/index.js"
import { isNothing } from "../nothing/index.js"
import { isAnything } from "./isAnything.js"
import { merge } from "./merge.js"

defineHandler(merge, [isAnything, isNothing], (content, increment) => content)
defineHandler(merge, [isNothing, isAnything], (content, increment) => increment)
