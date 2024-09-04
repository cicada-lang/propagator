import { defineGeneric } from "../generic/index.js"

// # The contract of `merge`
//
// The contract of the generic function merge is that it takes two
// arguments the currently known information and the new information
// being supplied, and returns the new aggregate information.  If the
// information being supplied is redundant, the merge function should
// return exactly (by `===`) the original information, so that the
// cell can know that the news was redundant and not alert its
// neighbors.  If the new information contradicts the old information,
// merge should return a distinguished value indicating the
// contradiction, so that the cell can signal an error. For symmetry
// and future use, if the new information strictly supersedes the old
// (i.e., if the old information would be redundant given the new, but
// the new is not redundant given the old) merge is expected to return
// exactly (by `===`) the new information.

// # `merge` is not entirely symmetric
//
// If the first and second arguments represent equivalent information
// but are not equal (by `===`), merge must return the first rather
// than the second. This is a consequence of the asymmetry in the
// cells’ treatment of their existing content versus incoming
// content. Having merge return the wrong one could lead to spurious
// infinite loops.

export const merge = defineGeneric()

export function implies<A, B>(x: A, y: B): boolean {
  return merge(x, y) === x
}
