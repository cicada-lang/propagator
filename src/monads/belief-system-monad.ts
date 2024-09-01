import { BeliefSystem, isBeliefSystem } from "../belief-system/index.js"
import { Belief } from "../belief/index.js"
import { defineHandler } from "../generic/index.js"
import { fmap, join } from "../monad/index.js"
import { isFunction } from "../utils/isFunction.js"

defineHandler(fmap, [isFunction, isBeliefSystem], (f, ma: BeliefSystem<any>) =>
  BeliefSystem(ma.beliefs.map((belief) => fmap(f, belief))),
)

defineHandler(
  join,
  [
    (mma) =>
      isBeliefSystem(mma) &&
      mma.beliefs.some((belief) => isBeliefSystem(belief.value)),
  ],
  (mma: BeliefSystem<any>) =>
    join(
      BeliefSystem(
        mma.beliefs.flatMap((belief) =>
          isBeliefSystem(belief.value)
            ? belief.value.beliefs.map((innerBelief) =>
                join(Belief(innerBelief, belief.reason)),
              )
            : [belief],
        ),
      ),
    ),
)
