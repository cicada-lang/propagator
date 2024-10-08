import { nothing } from "../nothing/Nothing.js"
import { definePrimitive } from "../propagator/index.js"

// For `switch` is preserved by JavaScript.
export const switcher = definePrimitive(3, (control, input) =>
  control ? input : nothing,
)
