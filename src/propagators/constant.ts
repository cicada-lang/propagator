import { definePrimitive } from "../propagator/index.js"

export function constant<T>(content: T) {
  return definePrimitive(1, () => content)
}

export function constantCell<T>(content: T) {
  return constant(content)()
}
