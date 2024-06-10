export class Cell<T> {
  constructor(public value?: T) {}

  get() {
    return this.value
  }

  set(value: T) {
    this.value = value
  }
}
