import assert from "node:assert"
import test from "node:test"
import { patch } from "../cell/index.ts"
import { nothing } from "../nothing/index.ts"
import { run } from "../scheduler/index.ts"
import { conditional, conditionalWriter } from "./conditional.ts"

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
