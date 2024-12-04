import assert from "node:assert"
import test from "node:test"
import { patch } from "../cell/index.ts"
import { run } from "../scheduler/index.ts"
import { conjoiner, disjoiner, inverter } from "./boolean.ts"

test("propagators / boolean", async () => {
  {
    const [x, y] = inverter()
    patch(x, true)
    await run()
    assert(y.content === false)
  }

  {
    const [x, y, z] = conjoiner()
    patch(x, true)
    patch(y, false)
    await run()
    assert(z.content === false)
  }

  {
    const [x, y, z] = disjoiner()
    patch(x, true)
    patch(y, false)
    await run()
    assert(z.content === true)
  }
})
