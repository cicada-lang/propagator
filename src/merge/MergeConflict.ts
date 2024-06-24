export type MergeConflict = {
  "@type": "MergeConflict"
}

export const theMergeConflict: MergeConflict = {
  "@type": "MergeConflict",
}

export function detectMergeConflict(x: any): x is MergeConflict {
  return x === theMergeConflict
}
