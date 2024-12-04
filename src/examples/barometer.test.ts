import assert from "node:assert"
import { test } from "node:test"
import { Cell, patch } from "../cell/index.ts"
import { Interval, intervalAlmostEqual } from "../interval/index.ts"
import { run } from "../scheduler/index.ts"
import { fallDuration, similarTriangles } from "./barometer.ts"

test("examples / barometer / fallDuration", async () => {
  const [fallTime, buildingHeight] = fallDuration()
  patch(fallTime, Interval(2.9, 3.1))

  await run()

  assert(
    intervalAlmostEqual(buildingHeight.content, Interval(41.16, 47.24), 0.01),
  )
})

test("examples / barometer / fallDuration / Interval + Number", async () => {
  const [fallTime, buildingHeight] = fallDuration()
  patch(fallTime, Interval(2.9, 3.1))

  await run()

  assert(
    intervalAlmostEqual(buildingHeight.content, Interval(41.16, 47.24), 0.01),
  )

  patch(buildingHeight, 45)

  await run()

  assert(intervalAlmostEqual(fallTime.content, Interval(3.02, 3.03), 0.01))
})

test("examples / barometer / similarTriangles & fallDuration", async () => {
  const [barometerShadow, barometerHeight, buildingShadow, buildingHeight] =
    similarTriangles()
  patch(buildingShadow, Interval(54.9, 55.1))
  patch(barometerHeight, Interval(0.3, 0.32))
  patch(barometerShadow, Interval(0.36, 0.37))

  await run()

  assert(
    intervalAlmostEqual(buildingHeight.content, Interval(44.51, 48.97), 0.01),
  )

  const fallTime = Cell()
  fallDuration(fallTime, buildingHeight)
  patch(fallTime, Interval(2.9, 3.1))

  await run()

  assert(
    intervalAlmostEqual(buildingHeight.content, Interval(44.51, 47.24), 0.01),
  )
})
