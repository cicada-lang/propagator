import test from "node:test"
import { patch } from "../cell/index.js"
import { run } from "../scheduler/index.js"
import { conditional } from "./conditional.js"

test("propagators / conditional", async () => {
  {
    const [control, ifTrue, ifFalse, output] = conditional()
    patch(control, true)
    patch(ifFalse, 0)
    patch(ifTrue, 1)
    await run()
    assert(output.content === 1)
  }
})
