import { merge } from "../merge/merge.js"
import { type Nothing, nothing } from "../nothing/Nothing.js"
import type { Belief } from "./Belief.js"

export function beliefMergeMany<A>(
  beliefs: Array<Belief<A>>,
): Belief<A> | Nothing {
  return beliefs.reduce((result, belief) => merge(result, belief), nothing)
}
