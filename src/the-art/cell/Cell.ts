export interface Cell<T> {
  "@type": "Cell"
  value?: T
}

export function makeCell<T>(value?: T): Cell<T> {
  return {
    "@type": "Cell",
    value,
  }
}

export function content<T>(cell: Cell<T>): T | undefined {
  return cell.value
}

export function addContent<T>(cell: Cell<T>, value: T): void {
  cell.value = value
}
