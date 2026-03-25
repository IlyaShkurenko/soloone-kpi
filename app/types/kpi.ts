export interface KpiUserOption {
  id: string
  label: string
}

export interface MetricDescriptor {
  id: string
  label: string
  description: string
  kind: 'duration' | 'decision' | 'rate'
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
  userLabels: string[]
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

export interface AiAutomationRateSummary {
  totalUsers: number
  usersWithMetric: number
  coverageRate: number
  totalSuccessfulAiReplies: number
  autoSentReplies: number
  autoSentRate: number
  reviewedReplies: number
  reviewedRate: number
}

export interface AiAutomationRateSeriesPoint {
  bucketStart: string
  users: number
  userLabels: string[]
  totalSuccessfulAiReplies: number
  autoSentReplies: number
  autoSentRate: number
  reviewedReplies: number
  reviewedRate: number
}

export interface AiAutomationRateMetric {
  metricId: 'ai-automation-rate'
  granularity: 'day' | 'week' | 'month'
  filters: {
    startDate: string | null
    endDate: string | null
    userIds: string[]
  }
  summary: AiAutomationRateSummary
  series: AiAutomationRateSeriesPoint[]
}

export interface AiReplyRateSummary {
  totalUsers: number
  usersWithMetric: number
  coverageRate: number
  totalSuccessfulOutgoingReplies: number
  aiReplies: number
  aiReplyRate: number
  humanReplies: number
  humanReplyRate: number
}

export interface AiReplyRateSeriesPoint {
  bucketStart: string
  users: number
  userLabels: string[]
  totalSuccessfulOutgoingReplies: number
  aiReplies: number
  aiReplyRate: number
  humanReplies: number
  humanReplyRate: number
}

export interface AiReplyRateMetric {
  metricId: 'ai-reply-rate'
  granularity: 'day' | 'week' | 'month'
  filters: {
    startDate: string | null
    endDate: string | null
    userIds: string[]
  }
  summary: AiReplyRateSummary
  series: AiReplyRateSeriesPoint[]
}

export interface AiEscalationRateSummary {
  totalUsers: number
  usersWithMetric: number
  coverageRate: number
  totalAiAttempts: number
  escalatedAttempts: number
  escalationRate: number
  nonEscalatedAttempts: number
  nonEscalationRate: number
}

export interface AiEscalationRateSeriesPoint {
  bucketStart: string
  users: number
  userLabels: string[]
  totalAiAttempts: number
  escalatedAttempts: number
  escalationRate: number
  nonEscalatedAttempts: number
  nonEscalationRate: number
}

export interface AiEscalationRateMetric {
  metricId: 'ai-escalation-rate'
  granularity: 'day' | 'week' | 'month'
  filters: {
    startDate: string | null
    endDate: string | null
    userIds: string[]
  }
  summary: AiEscalationRateSummary
  series: AiEscalationRateSeriesPoint[]
}

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
  userLabels: string[]
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

export type KpiMetric = DurationMetric | AiResponseDecisionMetric | AiAutomationRateMetric | AiReplyRateMetric | AiEscalationRateMetric
