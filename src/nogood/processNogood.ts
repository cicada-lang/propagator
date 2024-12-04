import type { Reasons } from "../reason/index.ts"

export function processNogood(reasons: Reasons): void {
  const who = "processNogood"
  console.log({ who, reasons })
}
