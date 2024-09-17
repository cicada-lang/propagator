import assert from "node:assert"
import { test } from "node:test"
import { Cell, patch } from "../cell/index.js"
import { run } from "../scheduler/index.js"
import { heronStep } from "./heron.js"

test("examples / heron / heronStep", async () => {
  const [x, guess, betterGuess] = heronStep()
  patch(x, 2)
  patch(guess, 1.4)

  await run()

  assert.deepStrictEqual(betterGuess.content, 1.4142857142857141)
})

test("examples / heron / heronStep / expression-like", async () => {
  const betterGuess = heronStep(Cell(2), Cell(1.4))

  await run()

  assert.deepStrictEqual(betterGuess.content, 1.4142857142857141)
})
