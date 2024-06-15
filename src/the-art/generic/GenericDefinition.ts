type Predicate = (x: any) => boolean

export type Handler = {
  predicates: Array<Predicate>
  (...args: Array<unknown>): void
}

export type GenericDefinition = {
  (...args: Array<unknown>): void
  handlers: Array<Handler>
}
