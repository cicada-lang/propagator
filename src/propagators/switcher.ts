import { nothing } from "../nothing/Nothing.ts"
import { definePrimitive } from "../propagator/index.ts"

// For `switch` is preserved by JavaScript.
export const switcher = definePrimitive(3, (control, input) =>
  control ? input : nothing,
)
