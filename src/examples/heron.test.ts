import assert from "node:assert"
import { test } from "node:test"
import { cell } from "../cell/Cell.js"
import { addContent } from "../cell/addContent.js"
import { run } from "../scheduler/index.js"
import { heronStep } from "./heron.js"

test("heronStep", async () => {
  const [x, guess, betterGuess] = heronStep()

  addContent(x, 2)
  addContent(guess, 1.4)

  await run()

  assert.deepStrictEqual(betterGuess.content, 1.4142857142857141)
})

test("heronStep -- expression-like", async () => {
  const betterGuess = heronStep(cell(2), cell(1.4))

  await run()

  assert.deepStrictEqual(betterGuess.content, 1.4142857142857141)
})
