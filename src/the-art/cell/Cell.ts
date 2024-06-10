export type Propagator = () => void

export type Cell<T> = {
  "@type": "Cell"
  value?: T
  propagators: Array<Propagator>
}

export function makeCell<T>(value?: T): Cell<T> {
  return {
    "@type": "Cell",
    value,
    propagators: [],
  }
}

export function content<T>(cell: Cell<T>): T | undefined {
  return cell.value
}

export function addContent<T>(cell: Cell<T>, value: T): void {
  cell.value = value
}

export function addPropagator<T>(cell: Cell<T>, propagator: Propagator): void {
  if (cell.propagators.includes(propagator)) {return}

  cell.propagators.push(propagator)
  broadcast([propagator])
}

export function broadcast(propagators: Array<Propagator>): void {
  for (const propagator of propagators) {
    propagator()
  }
}
