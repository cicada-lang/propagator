import { definePrimitive } from "../propagator/index.js"

export const switcher = definePrimitive(3, (control, input, output) => {
  if (control) return input
  else return output
})
