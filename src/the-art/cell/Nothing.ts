export type Nothing = {
  "@type": "Nothing"
}

export const nothing: Nothing = {
  "@type": "Nothing",
}

export function isNothing(x: any): x is Nothing {
  return x === nothing
}
