import { definePrimitive } from "../propagator/definePrimitive.js"

export function constant<T>(value: T) {
  return definePrimitive(1, () => value)
}
