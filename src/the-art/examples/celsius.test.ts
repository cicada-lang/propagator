import assert from "node:assert"
import { test } from "node:test"
import { content } from "../cell/Cell.js"
import { addContent } from "../cell/addContent.js"
import {
  celsiusKelvin,
  fahrenheitCelsius,
  fahrenheitToCelsius,
} from "./celsius.js"

test("fahrenheitToCelsius", () => {
  const [f, c] = fahrenheitToCelsius()

  addContent(f, 77)

  assert.deepStrictEqual(content(c), 25)
})

test("fahrenheitCelsius", () => {
  {
    const [f, c] = fahrenheitCelsius()

    addContent(f, 77)

    assert.deepStrictEqual(content(c), 25)
  }

  {
    const [f, c] = fahrenheitCelsius()

    addContent(c, 25)

    assert.deepStrictEqual(content(f), 77)
  }
})

test("celsiusKelvin", () => {
  const [f, c] = fahrenheitCelsius()
  const k = celsiusKelvin(c)

  addContent(f, 77)

  assert.deepStrictEqual(content(c), 25)
  assert.deepStrictEqual(content(k), 298.15)
})
