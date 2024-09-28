import { definePrimitive } from "../propagator/index.js"

// For `switch` is preserved by JavaScript.
export const switcher = definePrimitive(3, (control, input, output) => {
  if (control) return input
  else return output
})
