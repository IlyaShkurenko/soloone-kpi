export interface KpiUserOption {
  id: string
  label: string
}

export interface MetricDescriptor {
  id: string
  label: string
  description: string
  headlineDescription: string
  trendTitle: string
  trendHint: string
}

export interface DurationMetricSummary {
  totalUsers: number
  usersWithMetric: number
  coverageRate: number
  averageHours: number | null
  medianHours: number | null
  minHours: number | null
  maxHours: number | null
}

export interface DurationMetricSeriesPoint {
  bucketStart: string
  averageHours: number | null
  medianHours: number | null
  minHours: number | null
  maxHours: number | null
  users: number
}

export interface DurationMetric<MetricId extends string = string> {
  metricId: MetricId
  granularity: 'day' | 'week' | 'month'
  filters: {
    startDate: string | null
    endDate: string | null
    userIds: string[]
  }
  summary: DurationMetricSummary
  series: DurationMetricSeriesPoint[]
}

export type FirstAiInteractionMetric = DurationMetric<'first-ai-interaction'>
export type FirstTransactionMetric = DurationMetric<'first-transaction'>
