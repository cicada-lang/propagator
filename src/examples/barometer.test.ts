import assert from "node:assert"
import { test } from "node:test"
import { Cell, addContent } from "../cell/index.js"
import { Interval, intervalAlmostEqual } from "../interval/index.js"
import { run } from "../scheduler/index.js"
import { fallDuration, similarTriangles } from "./barometer.js"

test("examples / barometer / fallDuration", async () => {
  const [fallTime, buildingHeight] = fallDuration()
  addContent(fallTime, Interval(2.9, 3.1))

  await run()

  assert(
    intervalAlmostEqual(
      buildingHeight.content,
      Interval(41.163, 47.243),
      0.001,
    ),
  )
})

test("examples / barometer / fallDuration / Interval + Number", async () => {
  const [fallTime, buildingHeight] = fallDuration()
  addContent(fallTime, Interval(2.9, 3.1))

  await run()

  addContent(buildingHeight, Interval(45, 45))

  await run()

  assert(intervalAlmostEqual(fallTime.content, Interval(3.0255, 3.0322), 0.001))
})

test("examples / barometer / similarTriangles & fallDuration", async () => {
  const [barometerShadow, barometerHeight, buildingShadow, buildingHeight] =
    similarTriangles()
  addContent(buildingShadow, Interval(54.9, 55.1))
  addContent(barometerHeight, Interval(0.3, 0.32))
  addContent(barometerShadow, Interval(0.36, 0.37))

  await run()

  assert(
    intervalAlmostEqual(
      buildingHeight.content,
      Interval(44.514, 48.978),
      0.001,
    ),
  )

  const fallTime = Cell()
  fallDuration(fallTime, buildingHeight)
  addContent(fallTime, Interval(2.9, 3.1))

  await run()

  assert(
    intervalAlmostEqual(
      buildingHeight.content,
      Interval(44.514, 47.243),
      0.001,
    ),
  )
})
