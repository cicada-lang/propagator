import { type Belief, beliefEqual } from "../belief/index.ts"
import { QuotientSet } from "../utils/quotient-set/index.ts"
import type { BeliefSystem } from "./BeliefSystem.ts"

export function beliefSystemEqual<A>(
  x: BeliefSystem<A>,
  y: BeliefSystem<A>,
  options?: {
    valueEqual?: (x: A, y: A) => boolean
  },
): boolean {
  const valueEqual = options?.valueEqual || ((x, y) => x === y)

  const equal = (x: Belief<A>, y: Belief<A>) =>
    beliefEqual(x, y, { valueEqual })

  const xBeliefSet = new QuotientSet({ equal }).addMany(x.beliefs)
  const yBeliefSet = new QuotientSet({ equal }).addMany(y.beliefs)

  return xBeliefSet.isEqualTo(yBeliefSet)
}
