export function merge(content: any, increment: any): any {
  if (increment === undefined) {
    return content
  }

  if (content === undefined) {
    return increment
  }

  if (increment === content) {
    return content
  } else {
    return undefined
  }
}
