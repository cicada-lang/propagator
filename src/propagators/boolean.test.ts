import assert from "node:assert"
import test from "node:test"
import { patch } from "../cell/index.js"
import { run } from "../scheduler/index.js"
import { inverter } from "./boolean.js"

test("propagators / boolean", async () => {
  const [x, y] = inverter()
  patch(x, true)

  await run()

  assert(y.content === false)
})
