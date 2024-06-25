import assert from "node:assert"
import { test } from "node:test"
import { Cell, put } from "../cell/index.js"
import { Supported, assertSupported } from "../dependency/index.js"
import { Interval, intervalAlmostEqual } from "../interval/index.js"
import { run } from "../scheduler/index.js"

test("dependency / a justified-intervals anomaly", async () => {
  // A:     [           ]
  // B:           [        ]
  // -----------------------
  // A,B:         [     ]
  // C:         [   ]
  // -----------------------
  // A,B,C:       [ ]

  const interval = Cell()
  put(interval, Supported(Interval(0, 100), ["A"]))
  put(interval, Supported(Interval(50, 200), ["B"]))
  put(interval, Supported(Interval(25, 75), ["C"]))

  await run()

  // Actually no dependency on A, but A is recorded anyway.
  assertSupported(interval.content, ["A", "B", "C"])
  assert(intervalAlmostEqual(interval.content.value, Interval(50, 75), 0))

  {
    // The order matters.

    const interval = Cell()
    put(interval, Supported(Interval(25, 75), ["C"]))
    put(interval, Supported(Interval(0, 100), ["A"]))
    put(interval, Supported(Interval(50, 200), ["B"]))

    await run()

    assertSupported(interval.content, ["B", "C"])
    assert(intervalAlmostEqual(interval.content.value, Interval(50, 75), 0))
  }
})
