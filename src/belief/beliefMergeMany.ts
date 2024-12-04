import { merge } from "../merge/merge.ts"
import { type Nothing, nothing } from "../nothing/Nothing.ts"
import type { Belief } from "./Belief.ts"

export function beliefMergeMany<A>(
  beliefs: Array<Belief<A>>,
): Belief<A> | Nothing {
  return beliefs.reduce((result, belief) => merge(result, belief), nothing)
}
