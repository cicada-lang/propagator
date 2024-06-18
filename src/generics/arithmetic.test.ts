import assert from "node:assert"
import test from "node:test"
import { Interval } from "../interval/index.js"
import { add } from "./arithmetic.js"

test("generics -- arithmetic -- add", () => {
  assert.deepStrictEqual(add(1, 2), 3)
  assert.deepStrictEqual(add(Interval(1, 2), Interval(3, 4)), Interval(4, 6))
})
