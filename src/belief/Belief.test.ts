import assert from "node:assert"
import { test } from "node:test"
import { Cell, patch } from "../cell/index.ts"
import { Interval, intervalAlmostEqual } from "../interval/index.ts"
import { run } from "../scheduler/index.ts"
import { Belief, beliefEqual, isBelief } from "./index.ts"

test("dependency / a justified-intervals anomaly", async () => {
  // A:     [           ]
  // B:           [        ]
  // -----------------------
  // A,B:         [     ]
  // C:         [   ]
  // -----------------------
  // A,B,C:       [ ]

  const interval = Cell()
  patch(interval, Belief(Interval(0, 100), ["A"]))
  patch(interval, Belief(Interval(50, 200), ["B"]))
  patch(interval, Belief(Interval(25, 75), ["C"]))

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
    patch(interval, Belief(Interval(25, 75), ["C"]))
    patch(interval, Belief(Interval(0, 100), ["A"]))
    patch(interval, Belief(Interval(50, 200), ["B"]))

    await run()

    assert(
      isBelief(interval.content) &&
        beliefEqual(interval.content, Belief(Interval(50, 75), ["B", "C"]), {
          valueEqual: (x, y) => intervalAlmostEqual(x, y, 0),
        }),
    )
  }
})
