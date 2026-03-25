export interface KpiUserOption {
  id: string
  label: string
}

export interface MetricDescriptor {
  id: string
  label: string
  description: string
  kind: 'duration' | 'decision'
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

export interface AiResponseDecisionSummary {
  totalUsers: number
  usersWithMetric: number
  coverageRate: number
  totalDecisions: number
  approvedAsIsCount: number
  approvedAsIsRate: number
  approvedAfterEditCount: number
  approvedAfterEditRate: number
  cancelledCount: number
  cancelledRate: number
  regeneratedCount: number
  regeneratedRate: number
}

export interface AiResponseDecisionSeriesPoint {
  bucketStart: string
  users: number
  totalDecisions: number
  approvedAsIsCount: number
  approvedAsIsRate: number
  approvedAfterEditCount: number
  approvedAfterEditRate: number
  cancelledCount: number
  cancelledRate: number
  regeneratedCount: number
  regeneratedRate: number
}

export interface AiResponseDecisionMetric {
  metricId: 'ai-response-decisions'
  granularity: 'day' | 'week' | 'month'
  filters: {
    startDate: string | null
    endDate: string | null
    userIds: string[]
  }
  summary: AiResponseDecisionSummary
  series: AiResponseDecisionSeriesPoint[]
}

export type KpiMetric = DurationMetric | AiResponseDecisionMetric
