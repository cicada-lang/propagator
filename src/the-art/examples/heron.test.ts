import assert from "node:assert"
import { test } from "node:test"
import { content, createCell } from "../cell/Cell.js"
import { addContent } from "../cell/addContent.js"
import { heronStep } from "./heron.js"

test("heronStep", () => {
  const [x, guess, betterGuess] = heronStep()

  addContent(x, 2)
  addContent(guess, 1.4)

  assert.deepStrictEqual(content(betterGuess), 1.4142857142857141)
})

test("heronStep -- expression-like", () => {
  const betterGuess = heronStep(createCell(2), createCell(1.4))

  assert.deepStrictEqual(content(betterGuess), 1.4142857142857141)
})
