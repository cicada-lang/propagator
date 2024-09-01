import assert from "node:assert"
import { test } from "node:test"
import { Cell, put } from "../cell/index.js"
import { Interval, intervalAlmostEqual } from "../interval/index.js"
import { run } from "../scheduler/index.js"
import { Belief, beliefEqual, isBelief } from "./index.js"

test("dependency / a justified-intervals anomaly", async () => {
  // A:     [           ]
  // B:           [        ]
  // -----------------------
  // A,B:         [     ]
  // C:         [   ]
  // -----------------------
  // A,B,C:       [ ]

  const interval = Cell()
  put(interval, Belief(Interval(0, 100), ["A"]))
  put(interval, Belief(Interval(50, 200), ["B"]))
  put(interval, Belief(Interval(25, 75), ["C"]))

  await run()

  // Actually no dependency on A, but A is recorded anyway.

  assert(
    isBelief(interval.content) &&
      beliefEqual(interval.content, Belief(Interval(50, 75), ["A", "B", "C"]), {
        valueEqual: (x, y) => intervalAlmostEqual(x, y, 0),
      }),
  )

  {
    // The order matters.

    const interval = Cell()
    put(interval, Belief(Interval(25, 75), ["C"]))
    put(interval, Belief(Interval(0, 100), ["A"]))
    put(interval, Belief(Interval(50, 200), ["B"]))

    await run()

    assert(
      isBelief(interval.content) &&
        beliefEqual(interval.content, Belief(Interval(50, 75), ["B", "C"]), {
          valueEqual: (x, y) => intervalAlmostEqual(x, y, 0),
        }),
    )
  }
})
