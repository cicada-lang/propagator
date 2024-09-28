import assert from "node:assert"
import test from "node:test"
import { Belief, isBelief } from "../belief/Belief.js"
import { beliefEqual } from "../belief/beliefEqual.js"
import { patch } from "../cell/index.js"
import { nothing } from "../nothing/index.js"
import { run } from "../scheduler/index.js"
import { switcher } from "./switcher.js"

test("propagators / switcher", async () => {
  const [control, input, output] = switcher()
  patch(input, 6)

  await run()

  assert.deepStrictEqual(output.content, nothing)
  patch(control, Belief(true, ["hello"]))

  await run()

  assert(
    isBelief(output.content) &&
      beliefEqual(output.content, Belief(6, ["hello"])),
  )
})
