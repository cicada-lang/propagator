import assert from "node:assert"
import test from "node:test"
import { defineGeneric } from "./defineGeneric.js"
import { defineHandler } from "./defineHandler.js"

test("defineGeneric", () => {
  const add = defineGeneric()

  function isNumber(x: any): x is number {
    return typeof x === "number"
  }

  function isString(x: any): x is string {
    return typeof x === "string"
  }

  defineHandler(add, [isNumber, isNumber], (x, y) => x + y)
  defineHandler(add, [isString, isString], (x, y) => `${x} + ${y}`)

  assert.strictEqual(add(1, 2), 3)
  assert.strictEqual(add("a", "b"), "a + b")
})
