import assert from "node:assert"
import { test } from "node:test"
import { content, createCell } from "../cell/Cell.js"
import { addContent } from "../cell/addContent.js"
import { heronStep } from "./heron.js"

test("heronStep", () => {
  const x = createCell<number>()
  const guess = createCell<number>()
  const betterGuess = createCell<number>()

  heronStep(x, guess, betterGuess)
  addContent(x, 2)
  addContent(guess, 1.4)

  assert.deepStrictEqual(content(betterGuess), 1.4142857142857141)
})
