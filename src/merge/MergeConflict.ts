export type MergeConflict = {
  "@type": "MergeConflict"
}

export const theMergeConflict: MergeConflict = {
  "@type": "MergeConflict",
}

export function isMergeConflict(x: any): x is MergeConflict {
  return x === theMergeConflict
}
