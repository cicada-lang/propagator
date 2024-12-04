import assert from "node:assert"
import test from "node:test"
import { nothing } from "../nothing/Nothing.ts"
import { run } from "../scheduler/index.ts"
import { constantCell } from "./constant.ts"

test("propagators / constant", async () => {
  const x = constantCell(1)
  assert(x.content === nothing)
  await run()
  assert(x.content === 1)
})
