export type Interval = {
  "@type": "Interval"
  low: number
  high: number
}

export function Interval(low: number, high: number): Interval {
  return { "@type": "Interval", low, high }
}
