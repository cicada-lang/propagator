import assert from "node:assert"
import test from "node:test"
import { nothing } from "../nothing/Nothing.js"
import { run } from "../scheduler/index.js"
import { constantCell } from "./constant.js"

test("propagators / constant", async () => {
  const x = constantCell(1)
  assert(x.content === nothing)
  await run()
  assert(x.content === 1)
})
