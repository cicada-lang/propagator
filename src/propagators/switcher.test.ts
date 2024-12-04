import assert from "node:assert"
import test from "node:test"
import { Belief, isBelief } from "../belief/Belief.ts"
import { beliefEqual } from "../belief/beliefEqual.ts"
import { patch } from "../cell/index.ts"
import { nothing } from "../nothing/index.ts"
import { run } from "../scheduler/index.ts"
import { switcher } from "./switcher.ts"

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
