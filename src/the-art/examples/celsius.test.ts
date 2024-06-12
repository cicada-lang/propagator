import assert from "node:assert"
import { test } from "node:test"
import { content } from "../cell/Cell.js"
import { addContent } from "../cell/addContent.js"
import { fahrenheitToCelsius } from "./celsius.js"

test("fahrenheitToCelsius", () => {
  const [f, c] = fahrenheitToCelsius()

  addContent(f, 77)

  assert.deepStrictEqual(content(c), 25)
})
