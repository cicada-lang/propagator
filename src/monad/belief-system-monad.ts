import {
  BeliefSystem,
  beliefSystemQuery,
  isBeliefSystem,
} from "../belief-system/index.js"
import { Belief, isBelief } from "../belief/index.js"
import { defineHandler } from "../generic/index.js"
import { isFunction } from "../utils/isFunction.js"
import { flatten, fmap } from "./monad.js"

// If the input is a belief system, query it, operate on that, and
// pack the result up into a (one-item) belief system.
//
// The only choice made here is that we are following the philosophy
// set out in the main text of operating on the strongest possible
// consequences of what we currently believe (as found by the query)
// rather than on all variations of everything we might believe.

defineHandler(
  fmap,
  [isFunction, isBeliefSystem],
  (f, ma: BeliefSystem<any>) => {
    const strongestBelief = beliefSystemQuery(ma)
    return BeliefSystem([fmap(f, strongestBelief)])
  },
)

defineHandler(
  flatten,
  [
    (mma) =>
      isBeliefSystem(mma) &&
      mma.beliefs.some((belief) => isBeliefSystem(belief.value)),
  ],
  (mma: BeliefSystem<any>) => {
    const beliefs = mma.beliefs.flatMap((belief) => {
      if (isBeliefSystem(belief.value)) {
        return belief.value.beliefs.map((innerBelief) =>
          flatten(Belief(innerBelief, belief.reasons)),
        )
      } else {
        return [belief]
      }
    })

    return flatten(BeliefSystem(beliefs))
  },
)

// But we also need to extend the code for flattening a belief,
// because we want to do something interesting if we find a belief
// with a belief system inside (namely incorporate the reasons of that
// belief into the beliefs of that belief system).
//
// This handler also uses query to consider only the strongest belief
// of the inner belief system.

defineHandler(
  flatten,
  [(mma) => isBelief(mma) && isBeliefSystem(mma.value)],
  (mma: Belief<BeliefSystem<any>>) => {
    const innerBeliefSystem = mma.value
    const strongestBelief = beliefSystemQuery(innerBeliefSystem)
    const newBeliefSystem = BeliefSystem(
      flatten(Belief(strongestBelief, mma.reasons)),
    )
    return flatten(newBeliefSystem)
  },
)
