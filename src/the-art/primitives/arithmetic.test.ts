import assert from "node:assert"
import { test } from "node:test"
import { content, createCell } from "../cell/Cell.js"
import { addContent } from "../cell/addContent.js"
import { adder } from "./index.js"

test("adder", () => {
  const [x, y, z] = adder()

  addContent(x, 1)
  addContent(y, 2)

  assert.deepStrictEqual(content(z), 3)
})

test("adder -- expression-like", () => {
  const z = adder(createCell(1), createCell(2))

  assert.deepStrictEqual(content(z), 3)
})
