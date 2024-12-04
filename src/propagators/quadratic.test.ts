import assert from "node:assert"
import test from "node:test"
import { patch } from "../cell/index.ts"
import { run } from "../scheduler/index.ts"
import { quadratic } from "./quadratic.ts"

test("propagators / quadratic", async () => {
  {
    const [r, s] = quadratic()
    patch(r, 2)

    await run()

    assert.deepStrictEqual(s.content, 4)
  }

  {
    const [r, s] = quadratic()
    patch(s, 4)

    await run()

    assert.deepStrictEqual(r.content, 2)
  }
})
