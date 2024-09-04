import { BeliefSystem, isBeliefSystem } from "../belief-system/index.js"
import { Belief } from "../belief/index.js"
import { defineHandler } from "../generic/index.js"
import { isFunction } from "../utils/isFunction.js"
import { flatten, fmap } from "./monad.js"

defineHandler(fmap, [isFunction, isBeliefSystem], (f, ma: BeliefSystem<any>) =>
  BeliefSystem(ma.beliefs.map((belief) => fmap(f, belief))),
)

defineHandler(
  flatten,
  [
    (mma) =>
      isBeliefSystem(mma) &&
      mma.beliefs.some((belief) => isBeliefSystem(belief.value)),
  ],
  (mma: BeliefSystem<any>) =>
    flatten(
      BeliefSystem(
        mma.beliefs.flatMap((belief) =>
          isBeliefSystem(belief.value)
            ? belief.value.beliefs.map((innerBelief) =>
                flatten(Belief(innerBelief, belief.reasons)),
              )
            : [belief],
        ),
      ),
    ),
)
