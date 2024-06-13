import assert from "node:assert"
import { test } from "node:test"
import { content } from "../cell/Cell.js"
import { addContent } from "../cell/addContent.js"
import { fahrenheitAndCelsius, fahrenheitToCelsius } from "./celsius.js"

test("fahrenheitToCelsius", () => {
  const [f, c] = fahrenheitToCelsius()

  addContent(f, 77)

  assert.deepStrictEqual(content(c), 25)
})

test("fahrenheitAndCelsius", () => {
  {
    const [f, c] = fahrenheitAndCelsius()

    addContent(f, 77)

    assert.deepStrictEqual(content(c), 25)
  }

  {
    const [f, c] = fahrenheitAndCelsius()

    addContent(c, 25)

    assert.deepStrictEqual(content(f), 77)
  }
})
