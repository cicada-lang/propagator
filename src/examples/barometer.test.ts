import assert from "node:assert"
import { test } from "node:test"
import { Cell, put } from "../cell/index.js"
import { Supported } from "../dependency/index.js"
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
  put(buildingShadow, Supported(Interval(54.9, 55.1), new Set(["shadows"])))
  put(barometerHeight, Supported(Interval(0.3, 0.32), new Set(["shadows"])))
  put(barometerShadow, Supported(Interval(0.36, 0.37), new Set(["shadows"])))

  await run()

  assert.deepStrictEqual(buildingHeight.content.supports, new Set(["shadows"]))
  assert(
    intervalAlmostEqual(
      buildingHeight.content.value,
      Interval(44.514, 48.978),
      0.001,
    ),
  )

  const fallTime = Cell()
  fallDuration(fallTime, buildingHeight)
  put(fallTime, Supported(Interval(2.9, 3.3), new Set(["lousy-fall-time"])))

  await run()

  assert.deepStrictEqual(buildingHeight.content.supports, new Set(["shadows"]))
  assert(
    intervalAlmostEqual(
      buildingHeight.content.value,
      Interval(44.514, 48.978),
      0.001,
    ),
  )

  put(fallTime, Supported(Interval(2.9, 3.1), new Set(["better-fall-time"])))

  await run()

  assert.deepStrictEqual(
    buildingHeight.content.supports,
    new Set(["shadows", "better-fall-time"]),
  )
  assert(
    intervalAlmostEqual(
      buildingHeight.content.value,
      Interval(44.514, 47.243),
      0.001,
    ),
  )

  put(buildingHeight, Supported(45, new Set(["superintendent"])))

  await run()

  assert.deepStrictEqual(
    buildingHeight.content.supports,
    new Set(["superintendent"]),
  )
  assert.deepStrictEqual(buildingHeight.content.value, 45)

  console.log(barometerHeight.content)
  console.log(barometerShadow.content)
  console.log(buildingShadow.content)
  console.log(fallTime.content)

  {
    const [t, h] = fallDuration()
    put(h, 45)

    await run()
    console.log(t.content)
  }
})
