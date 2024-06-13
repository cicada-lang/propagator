import assert from "node:assert"
import { test } from "node:test"
import { content, createCell } from "../cell/Cell.js"
import { addContent } from "../cell/addContent.js"
import { adder, sum } from "./index.js"

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

test("sum", () => {
  {
    const [x, y, z] = sum()

    addContent(x, 1)
    addContent(y, 2)

    assert.deepStrictEqual(content(z), 3)
  }

  {
    const [x, y, z] = sum()

    addContent(x, 1)
    addContent(z, 3)

    assert.deepStrictEqual(content(y), 2)
  }

  {
    const [x, y, z] = sum()

    addContent(y, 2)
    addContent(z, 3)

    assert.deepStrictEqual(content(x), 1)
  }
})
