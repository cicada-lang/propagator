import assert from "node:assert"
import { test } from "node:test"
import { Belief, assertBeliefReasons } from "../belief/index.js"
import { Cell, put } from "../cell/index.js"
import { Interval, intervalAlmostEqual } from "../interval/index.js"
import { run } from "../scheduler/index.js"
import { fallDuration, similarTriangles } from "./barometer.js"

test("examples / barometer-belief", async () => {
  const [barometerShadow, barometerHeight, buildingShadow, buildingHeight] =
    similarTriangles()
  put(buildingShadow, Belief(Interval(54.9, 55.1), ["shadows"]))
  put(barometerHeight, Belief(Interval(0.3, 0.32), ["shadows"]))
  put(barometerShadow, Belief(Interval(0.36, 0.37), ["shadows"]))

  await run()

  assertBeliefReasons(buildingHeight.content, ["shadows"])
  assert(
    intervalAlmostEqual(
      buildingHeight.content.value,
      Interval(44.51, 48.97),
      0.01,
    ),
  )

  const fallTime = Cell()
  fallDuration(fallTime, buildingHeight)
  put(fallTime, Belief(Interval(2.9, 3.3), ["lousy-fall-time"]))

  await run()

  assertBeliefReasons(fallTime.content, ["shadows"])
  assert(intervalAlmostEqual(fallTime.content.value, Interval(3, 3.16), 0.01))

  assertBeliefReasons(buildingHeight.content, ["shadows"])
  assert(
    intervalAlmostEqual(
      buildingHeight.content.value,
      Interval(44.51, 48.97),
      0.01,
    ),
  )

  put(fallTime, Belief(Interval(2.9, 3.1), ["better-fall-time"]))

  await run()

  assertBeliefReasons(buildingHeight.content, ["shadows", "better-fall-time"])
  assert(
    intervalAlmostEqual(
      buildingHeight.content.value,
      Interval(44.51, 47.24),
      0.01,
    ),
  )

  put(buildingHeight, Belief(45, ["superintendent"]))

  await run()

  assertBeliefReasons(buildingHeight.content, ["superintendent"])
  assert.deepStrictEqual(buildingHeight.content.value, 45)

  assertBeliefReasons(barometerHeight.content, [
    "superintendent",
    "better-fall-time",
    "shadows",
  ])
  assert(
    intervalAlmostEqual(
      barometerHeight.content.value,
      Interval(0.3, 0.3),
      0.01,
    ),
  )

  assertBeliefReasons(barometerShadow.content, [
    "superintendent",
    "better-fall-time",
    "shadows",
  ])
  assert(
    intervalAlmostEqual(
      barometerShadow.content.value,
      Interval(0.36, 0.37),
      0.01,
    ),
  )

  assertBeliefReasons(buildingShadow.content, ["shadows"])
  assert(
    intervalAlmostEqual(
      buildingShadow.content.value,
      Interval(54.9, 55.1),
      0.01,
    ),
  )

  assertBeliefReasons(fallTime.content, ["superintendent"])
  assert(
    intervalAlmostEqual(fallTime.content.value, Interval(3.02, 3.03), 0.01),
  )

  {
    const [t, h] = fallDuration()
    put(h, 45)

    await run()

    assert(intervalAlmostEqual(t.content, Interval(3.02, 3.03), 0.01))
  }
})
