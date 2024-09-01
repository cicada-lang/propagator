export type Reason = string
export type Reasons = Set<Reason>
export type ReasonLike = Reasons | Array<Reason>

export function toReasons(x: ReasonLike): Reasons {
  if (x instanceof Array) {
    return new Set(x)
  }

  return x
}
