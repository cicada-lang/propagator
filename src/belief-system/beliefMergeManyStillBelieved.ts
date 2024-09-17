import type { Belief } from "../belief/Belief.js"
import { merge } from "../merge/merge.js"
import { type Nothing, nothing } from "../nothing/Nothing.js"
import { isBeliefBelieved } from "./isBeliefBelieved.js"

// The procedure `strongest` finds the most informative consequence
// of the current worldview. It does this by using merge to combine
// all of the currently believed beliefs.
// 注意，这里的 "most informative" 又是就 merge 而言的了，
// 别忘了 merge 所定义的 implies 与 isStronger 不同。

export function beliefMergeManyStillBelieved<A>(
  beliefs: Array<Belief<A>>,
): Belief<A> | Nothing {
  const stillBelievedBeliefs = beliefs.filter(isBeliefBelieved)
  return stillBelievedBeliefs.reduce(
    (result, belief) => merge(result, belief),
    nothing,
  )
}
