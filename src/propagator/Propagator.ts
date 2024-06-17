import type { MaybePromise } from "../utils/MaybePromise.js"

export type Propagator = () => MaybePromise<void>
