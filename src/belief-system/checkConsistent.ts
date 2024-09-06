import { log } from "console"
import { detectMergeConflict } from "../merge-conflict/detectMergeConflict.js"

export function checkConsistent(value: any): void {
  return

  if (detectMergeConflict(value)) {
    const who = "checkConsistent"
    const message = "Inconsistent value"
    log({ who, message, value })
  }
}
