export interface KpiUserOption {
  id: string
  label: string
}

export interface MetricDescriptor {
  id: string
  label: string
  description: string
}

export interface FirstAiInteractionSummary {
  totalUsers: number
  usersWithAiInteraction: number
  coverageRate: number
  averageHours: number | null
  medianHours: number | null
  minHours: number | null
  maxHours: number | null
}

export interface FirstAiInteractionSeriesPoint {
  bucketStart: string
  averageHours: number | null
  medianHours: number | null
  minHours: number | null
  maxHours: number | null
  users: number
}

export interface FirstAiInteractionMetric {
  metricId: 'first-ai-interaction'
  granularity: 'day' | 'week' | 'month'
  filters: {
    startDate: string | null
    endDate: string | null
    userIds: string[]
  }
  summary: FirstAiInteractionSummary
  series: FirstAiInteractionSeriesPoint[]
}
