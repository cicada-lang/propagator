import assert from "node:assert"
import test from "node:test"
import { sqrt, square } from "./quadratic.js"

test("generics / quadratic", async () => {
  assert.deepStrictEqual(square(2), 4)
  assert.deepStrictEqual(sqrt(4), 2)
})
