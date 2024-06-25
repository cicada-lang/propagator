import assert from "node:assert"
import { test } from "node:test"
import { Cell, put } from "../cell/index.js"
import { Supported, assertSupported } from "../dependency/index.js"
import { Interval, intervalAlmostEqual } from "../interval/index.js"
import { run } from "../scheduler/index.js"
import { fallDuration, similarTriangles } from "./barometer.js"

test("examples / barometer / fallDuration", async () => {
  const [fallTime, buildingHeight] = fallDuration()
  put(fallTime, Interval(2.9, 3.1))

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
  put(fallTime, Interval(2.9, 3.1))

  await run()

  assert(
    intervalAlmostEqual(
      buildingHeight.content,
      Interval(41.163, 47.243),
      0.001,
    ),
  )

  put(buildingHeight, 45)

  await run()

  assert(intervalAlmostEqual(fallTime.content, Interval(3.0255, 3.0322), 0.001))
})

test("examples / barometer / similarTriangles & fallDuration", async () => {
  const [barometerShadow, barometerHeight, buildingShadow, buildingHeight] =
    similarTriangles()
  put(buildingShadow, Interval(54.9, 55.1))
  put(barometerHeight, Interval(0.3, 0.32))
  put(barometerShadow, Interval(0.36, 0.37))

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
  put(fallTime, Interval(2.9, 3.1))

  await run()

  assert(
    intervalAlmostEqual(
      buildingHeight.content,
      Interval(44.514, 47.243),
      0.001,
    ),
  )
})

test("examples / barometer / with supported value", async () => {
  const [barometerShadow, barometerHeight, buildingShadow, buildingHeight] =
    similarTriangles()
  put(buildingShadow, Supported(Interval(54.9, 55.1), ["shadows"]))
  put(barometerHeight, Supported(Interval(0.3, 0.32), ["shadows"]))
  put(barometerShadow, Supported(Interval(0.36, 0.37), ["shadows"]))

  await run()

  assertSupported(buildingHeight.content, ["shadows"])
  assert(
    intervalAlmostEqual(
      buildingHeight.content.value,
      Interval(44.514, 48.978),
      0.001,
    ),
  )

  const fallTime = Cell()
  fallDuration(fallTime, buildingHeight)
  put(fallTime, Supported(Interval(2.9, 3.3), ["lousy-fall-time"]))

  await run()

  assertSupported(buildingHeight.content, ["shadows"])
  assert(
    intervalAlmostEqual(
      buildingHeight.content.value,
      Interval(44.514, 48.978),
      0.001,
    ),
  )

  put(fallTime, Supported(Interval(2.9, 3.1), ["better-fall-time"]))

  await run()

  assertSupported(buildingHeight.content, ["shadows", "better-fall-time"])
  assert(
    intervalAlmostEqual(
      buildingHeight.content.value,
      Interval(44.514, 47.243),
      0.001,
    ),
  )

  put(buildingHeight, Supported(45, ["superintendent"]))

  await run()

  assertSupported(buildingHeight.content, ["superintendent"])
  assert.deepStrictEqual(buildingHeight.content.value, 45)

  assertSupported(barometerHeight.content, [
    "superintendent",
    "better-fall-time",
    "shadows",
  ])
  assert(
    intervalAlmostEqual(
      barometerHeight.content.value,
      Interval(0.3, 0.30328),
      0.001,
    ),
  )

  assertSupported(barometerShadow.content, [
    "superintendent",
    "better-fall-time",
    "shadows",
  ])
  assert(
    intervalAlmostEqual(
      barometerShadow.content.value,
      Interval(0.366, 0.37),
      0.001,
    ),
  )

  assertSupported(buildingShadow.content, ["shadows"])
  assert(
    intervalAlmostEqual(
      buildingShadow.content.value,
      Interval(54.9, 55.1),
      0.001,
    ),
  )

  assertSupported(fallTime.content, ["superintendent"])
  assert(
    intervalAlmostEqual(
      fallTime.content.value,
      Interval(3.0255, 3.0322),
      0.001,
    ),
  )

  {
    const [t, h] = fallDuration()
    put(h, 45)

    await run()

    assert(intervalAlmostEqual(t.content, Interval(3.0255, 3.0322), 0.001))
  }
})
