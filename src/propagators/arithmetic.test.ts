import assert from "node:assert"
import { test } from "node:test"
import { Cell, patch } from "../cell/index.js"
import { run } from "../scheduler/index.js"
import { adder, multiplier, product, sum } from "./index.js"

test("propagators / arithmetic / adder", async () => {
  const [x, y, z] = adder()
  patch(x, 1)
  patch(y, 2)

  await run()

  assert.deepStrictEqual(z.content, 3)
})

test("propagators / arithmetic / adder / expression-like", async () => {
  const z = adder(Cell(1), Cell(2))

  await run()

  assert.deepStrictEqual(z.content, 3)
})

test("propagators / arithmetic / multiplier", async () => {
  const [x, y, z] = multiplier()
  patch(x, 2)
  patch(y, 3)

  await run()

  assert.deepStrictEqual(z.content, 6)
})

test("propagators / arithmetic / sum", async () => {
  {
    const [x, y, z] = sum()
    patch(x, 1)
    patch(y, 2)

    await run()

    assert.deepStrictEqual(z.content, 3)
  }

  {
    const [x, y, z] = sum()
    patch(x, 1)
    patch(z, 3)

    await run()

    assert.deepStrictEqual(y.content, 2)
  }

  {
    const [x, y, z] = sum()
    patch(y, 2)
    patch(z, 3)

    await run()

    assert.deepStrictEqual(x.content, 1)
  }
})

test("propagators / arithmetic / product", async () => {
  {
    const [x, y, z] = product()
    patch(x, 2)
    patch(y, 3)

    await run()

    assert.deepStrictEqual(z.content, 6)
  }

  {
    const [x, y, z] = product()
    patch(x, 2)
    patch(z, 6)

    await run()

    assert.deepStrictEqual(y.content, 3)
  }

  {
    const [x, y, z] = product()
    patch(y, 3)
    patch(z, 6)

    await run()

    assert.deepStrictEqual(x.content, 2)
  }
})
