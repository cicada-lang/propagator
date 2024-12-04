import { definePropagator } from "../propagator/index.ts"
import { inverter, switcher } from "./index.ts"

export const conditional = definePropagator(
  4,
  (control, ifTrue, ifFalse, output) => {
    switcher(control, ifTrue, output)
    switcher(inverter(control), ifFalse, output)
  },
)

export const conditionalWriter = definePropagator(
  4,
  (control, input, ifTrue, ifFalse) => {
    switcher(control, input, ifTrue)
    switcher(inverter(control), input, ifFalse)
  },
)
