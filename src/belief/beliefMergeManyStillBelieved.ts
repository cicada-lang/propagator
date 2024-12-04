import type { Belief } from "../belief/Belief.ts"
import { beliefMergeMany } from "../belief/index.ts"
import { type Nothing } from "../nothing/Nothing.ts"
import { isStillBelieved } from "./isStillBelieved.ts"

// This function finds the most informative consequence
// of the current worldview. It does this by using merge to combine
// all of the currently believed beliefs.
// 注意，这里的 "most informative" 又是就 merge 而言的了，
// 别忘了 merge 所定义的 implies 与 isStronger 不同。

export function beliefMergeManyStillBelieved<A>(
  beliefs: Array<Belief<A>>,
): Belief<A> | Nothing {
  return beliefMergeMany(beliefs.filter(isStillBelieved))
}
