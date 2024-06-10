export type Subscriber = () => void

export type Cell<T> = {
  "@type": "Cell"
  value?: T
  subscribers: Array<Subscriber>
}

export function makeCell<T>(value?: T): Cell<T> {
  return {
    "@type": "Cell",
    value,
    subscribers: [],
  }
}

export function content<T>(cell: Cell<T>): T | undefined {
  return cell.value
}

export function addContent<T>(cell: Cell<T>, value: T): void {
  cell.value = value
}

export function addSubscriber<T>(cell: Cell<T>, subscriber: Subscriber): void {
  if (cell.subscribers.includes(subscriber)) {return}

  cell.subscribers.push(subscriber)
  broadcast([subscriber])
}

export function broadcast(subscribers: Array<Subscriber>): void {
  for (const subscriber of subscribers) {
    subscriber()
  }
}
