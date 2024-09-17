import assert from "node:assert"
import { test } from "node:test"
import { Belief, beliefEqual, isBelief } from "../belief/index.js"
import { Cell, patch } from "../cell/index.js"
import { Interval, intervalAlmostEqual } from "../interval/index.js"
import { run } from "../scheduler/index.js"
import { fallDuration, similarTriangles } from "./barometer.js"

test("examples / barometer-belief", async () => {
  const [barometerShadow, barometerHeight, buildingShadow, buildingHeight] =
    similarTriangles()
  patch(buildingShadow, Belief(Interval(54.9, 55.1), ["shadows"]))
  patch(barometerHeight, Belief(Interval(0.3, 0.32), ["shadows"]))
  patch(barometerShadow, Belief(Interval(0.36, 0.37), ["shadows"]))

  await run()

  assert(
    isBelief(buildingHeight.content) &&
      beliefEqual(
        buildingHeight.content,
        Belief(Interval(44.51, 48.97), ["shadows"]),
        {
          valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
        },
      ),
  )

  const fallTime = Cell()
  fallDuration(fallTime, buildingHeight)
  patch(fallTime, Belief(Interval(2.9, 3.3), ["lousy-fall-time"]))

  await run()

  assert(
    isBelief(fallTime.content) &&
      beliefEqual(fallTime.content, Belief(Interval(3, 3.16), ["shadows"]), {
        valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
      }),
  )

  assert(
    isBelief(buildingHeight.content) &&
      beliefEqual(
        buildingHeight.content,
        Belief(Interval(44.51, 48.97), ["shadows"]),
        {
          valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
        },
      ),
  )

  patch(fallTime, Belief(Interval(2.9, 3.1), ["better-fall-time"]))

  await run()

  assert(
    isBelief(buildingHeight.content) &&
      beliefEqual(
        buildingHeight.content,
        Belief(Interval(44.51, 47.24), ["shadows", "better-fall-time"]),
        {
          valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
        },
      ),
  )

  patch(buildingHeight, Belief(45, ["superintendent"]))

  await run()

  assert(
    isBelief(buildingHeight.content) &&
      beliefEqual(buildingHeight.content, Belief(45, ["superintendent"]), {
        valueEqual: (x, y) => x === y,
      }),
  )

  assert(
    isBelief(barometerHeight.content) &&
      beliefEqual(
        barometerHeight.content,
        Belief(Interval(0.3, 0.3), [
          "superintendent",
          "better-fall-time",
          "shadows",
        ]),
        {
          valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
        },
      ),
  )

  assert(
    isBelief(barometerShadow.content) &&
      beliefEqual(
        barometerShadow.content,
        Belief(Interval(0.36, 0.37), [
          "superintendent",
          "better-fall-time",
          "shadows",
        ]),
        {
          valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
        },
      ),
  )

  assert(
    isBelief(buildingShadow.content) &&
      beliefEqual(
        buildingShadow.content,
        Belief(Interval(54.9, 55.1), ["shadows"]),
        {
          valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
        },
      ),
  )

  assert(
    isBelief(fallTime.content) &&
      beliefEqual(
        fallTime.content,
        Belief(Interval(3.02, 3.03), ["superintendent"]),
        {
          valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
        },
      ),
  )

  {
    const [t, h] = fallDuration()
    patch(h, 45)

    await run()

    assert(intervalAlmostEqual(t.content, Interval(3.02, 3.03), 0.01))
  }
})
