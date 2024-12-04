import type { MaybePromise } from "../utils/MaybePromise.ts"

export type Propagator = () => MaybePromise<void>
