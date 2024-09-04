import { defineHandler } from "../generic/index.js"
import { isNothing } from "../nothing/index.js"
import { merge } from "./merge.js"

function isAnything(x: any): true {
  return true
}

defineHandler(merge, [isAnything, isNothing], (content, increment) => content)
defineHandler(merge, [isNothing, isAnything], (content, increment) => increment)
