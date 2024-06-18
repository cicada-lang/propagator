import assert from "node:assert"
import { test } from "node:test"
import { addContent } from "../cell/addContent.js"
import { run } from "../scheduler/index.js"
import {
  celsiusKelvin,
  fahrenheitCelsius,
  fahrenheitToCelsius,
} from "./celsius.js"

test("examples / celsius / fahrenheitToCelsius", async () => {
  const [f, c] = fahrenheitToCelsius()

  addContent(f, 77)

  await run()

  assert.deepStrictEqual(c.content, 25)
})

test("examples / celsius / fahrenheitCelsius", async () => {
  {
    const [f, c] = fahrenheitCelsius()

    addContent(f, 77)

    await run()

    assert.deepStrictEqual(c.content, 25)
  }

  {
    const [f, c] = fahrenheitCelsius()

    addContent(c, 25)

    await run()

    assert.deepStrictEqual(f.content, 77)
  }
})

test("examples / celsius / celsiusKelvin", async () => {
  const [f, c] = fahrenheitCelsius()
  const k = celsiusKelvin(c)

  addContent(f, 77)

  await run()

  assert.deepStrictEqual(c.content, 25)
  assert.deepStrictEqual(k.content, 298.15)
})
