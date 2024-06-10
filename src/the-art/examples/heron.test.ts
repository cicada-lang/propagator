import { test } from "node:test"
import { content, makeCell } from "../cell/Cell.js"
import { addContent } from "../cell/addContent.js"
import { heronStep } from "./heron.js"

test("heronStep", () => {
  const x = makeCell<number>()
  const guess = makeCell<number>()
  const betterGuess = makeCell<number>()

  heronStep(x, guess, betterGuess)
  addContent(x, 2)
  addContent(guess, 1.4)
  console.log(content(betterGuess))
})
