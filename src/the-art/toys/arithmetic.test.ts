import assert from "node:assert"
import { test } from "node:test"
import { cell } from "../cell/Cell.js"
import { addContent } from "../cell/addContent.js"
import { run } from "../scheduler/index.js"
import { adder, multiplier, product, sum } from "./index.js"

test("adder", async () => {
  const [x, y, z] = adder()

  addContent(x, 1)
  addContent(y, 2)

  await run()

  assert.deepStrictEqual(z.content, 3)
})

test("adder -- expression-like", async () => {
  const z = adder(cell(1), cell(2))

  await run()

  assert.deepStrictEqual(z.content, 3)
})

test("multiplier", async () => {
  const [x, y, z] = multiplier()

  addContent(x, 2)
  addContent(y, 3)

  await run()

  assert.deepStrictEqual(z.content, 6)
})

test("sum", async () => {
  {
    const [x, y, z] = sum()

    addContent(x, 1)
    addContent(y, 2)

    await run()

    assert.deepStrictEqual(z.content, 3)
  }

  {
    const [x, y, z] = sum()

    addContent(x, 1)
    addContent(z, 3)

    await run()

    assert.deepStrictEqual(y.content, 2)
  }

  {
    const [x, y, z] = sum()

    addContent(y, 2)
    addContent(z, 3)

    await run()

    assert.deepStrictEqual(x.content, 1)
  }
})

test("product", async () => {
  {
    const [x, y, z] = product()

    addContent(x, 2)
    addContent(y, 3)

    await run()

    assert.deepStrictEqual(z.content, 6)
  }

  {
    const [x, y, z] = product()

    addContent(x, 2)
    addContent(z, 6)

    await run()

    assert.deepStrictEqual(y.content, 3)
  }

  {
    const [x, y, z] = product()

    addContent(y, 3)
    addContent(z, 6)

    await run()

    assert.deepStrictEqual(x.content, 2)
  }
})
