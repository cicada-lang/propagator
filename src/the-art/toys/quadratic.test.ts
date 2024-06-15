import assert from "node:assert"
import test from "node:test"
import { addContent } from "../cell/addContent.js"
import { content } from "../cell/index.js"
import { quadratic } from "./quadratic.js"

test("quadratic", () => {
  {
    const [r, s] = quadratic()
    addContent(r, 2)

    assert.deepStrictEqual(content(s), 4)
  }

  {
    const [r, s] = quadratic()
    addContent(s, 4)

    assert.deepStrictEqual(content(r), 2)
  }
})
