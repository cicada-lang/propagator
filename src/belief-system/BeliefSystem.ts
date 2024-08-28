import { type Belief } from "../belief/index.js"

export type BeliefSystem<A> = {
  beliefs: Array<Belief<A>>
}
