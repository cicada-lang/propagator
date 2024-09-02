import assert from "assert"
import { test } from "node:test"
import {
  BeliefSystem,
  beliefSystemEqual,
  isBeliefSystem,
} from "../belief-system/index.js"
import { Belief } from "../belief/index.js"
import { Cell, put } from "../cell/index.js"
import { Interval, intervalAlmostEqual, isInterval } from "../interval/index.js"
import { run } from "../scheduler/index.js"
import { fallDuration, similarTriangles } from "./barometer.js"

test("examples / barometer-belief-system", async () => {
  const [barometerShadow, barometerHeight, buildingShadow, buildingHeight] =
    similarTriangles()
  put(buildingShadow, BeliefSystem([Belief(Interval(54.9, 55.1), ["shadows"])]))
  put(barometerHeight, BeliefSystem([Belief(Interval(0.3, 0.32), ["shadows"])]))
  put(
    barometerShadow,
    BeliefSystem([Belief(Interval(0.36, 0.37), ["shadows"])]),
  )

  await run()

  assert(
    isBeliefSystem(buildingHeight.content) &&
      beliefSystemEqual(
        buildingHeight.content,
        BeliefSystem([Belief(Interval(44.51, 48.97), ["shadows"])]),
        {
          valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
        },
      ),
  )

  const fallTime = Cell()
  fallDuration(fallTime, buildingHeight)
  put(fallTime, BeliefSystem([Belief(Interval(2.9, 3.1), ["fall-time"])]))

  await run()

  assert(
    isBeliefSystem(buildingHeight.content) &&
      beliefSystemEqual(
        buildingHeight.content,
        BeliefSystem([
          Belief(Interval(44.51, 48.97), ["shadows"]),
          Belief(Interval(41.16, 47.24), ["fall-time"]),
          Belief(Interval(44.51, 47.24), ["shadows", "fall-time"]),
        ]),
        {
          valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
        },
      ),
  )

  put(buildingHeight, Belief(45, ["superintendent"]))

  await run()

  assert(
    isBeliefSystem(buildingHeight.content) &&
      beliefSystemEqual(
        buildingHeight.content,
        BeliefSystem<Interval | number>([
          Belief(Interval(44.51, 48.97), ["shadows"]),
          Belief(Interval(41.16, 47.24), ["fall-time"]),
          Belief(Interval(44.51, 47.24), ["shadows", "fall-time"]),
          Belief(45, ["superintendent"]),
        ]),
        {
          valueEqual: (x, y) => {
            if (isInterval(x) && isInterval(y)) {
              return intervalAlmostEqual(x, y, 0.01)
            } else {
              return x === y
            }
          },
        },
      ),
  )

  assert(
    isBeliefSystem(barometerHeight.content) &&
      beliefSystemEqual(
        barometerHeight.content,
        BeliefSystem([
          Belief(Interval(0.3, 0.32), ["shadows"]),
          Belief(Interval(0.3, 0.31), ["shadows", "fall-time"]),
          Belief(Interval(0.3, 0.3), [
            "shadows",
            "fall-time",
            "superintendent",
          ]),
          Belief(Interval(0.29, 0.3), ["shadows", "superintendent"]),
        ]),
        {
          valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
        },
      ),
  )
})
