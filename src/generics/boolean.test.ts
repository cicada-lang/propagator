import assert from "node:assert"
import test from "node:test"
import { and, not, or } from "./boolean.ts"

test("generics / boolean", () => {
  assert.deepStrictEqual(not(true), false)
  assert.deepStrictEqual(and(true, false), false)
  assert.deepStrictEqual(or(true, false), true)
})
