import assert from "node:assert"
import test from "node:test"
import { patch } from "../cell/index.js"
import { nothing } from "../nothing/index.js"
import { run } from "../scheduler/index.js"
import { conditional, conditionalWriter } from "./conditional.js"

test("propagators / conditional", async () => {
  {
    const [control, ifTrue, ifFalse, output] = conditional()
    patch(control, true)
    patch(ifFalse, 0)
    patch(ifTrue, 1)
    await run()
    assert(output.content === 1)
  }

  {
    const [control, input, ifTrue, ifFalse] = conditionalWriter()
    patch(control, true)
    patch(input, 6)
    await run()
    assert(ifTrue.content === 6)
    assert(ifFalse.content === nothing)
  }
})
