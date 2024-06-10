export class Cell<T> {
  constructor(public value?: T) {}

  get() {
    return this.value
  }

  set(value: T) {
    this.value = value
  }
}

export function makeCell<T>(value?: T): Cell<T> {
  return new Cell(value)
}
