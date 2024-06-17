import { definePrimitive } from "../propagator/definePrimitive.js"

export function constant<T>(content: T) {
  return definePrimitive(1, () => content)
}
