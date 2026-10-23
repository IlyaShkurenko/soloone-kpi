export interface KpiUserOption {
  id: string
  label: string
}

export interface MetricDescriptor {
  id: string
  label: string
  description: string
  kind: 'duration' | 'decision' | 'rate' | 'overview'
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

export type KpiMetric = ActivityOverviewMetric | DurationMetric | AiResponseDecisionMetric | AiAutomationRateMetric | AiReplyRateMetric | AiEscalationRateMetric

export interface ActivityPeriod {
  startDate: string
  endDate: string
  activeUsers: number
  activeChats: number
  messages: number
  revenue: Array<{ currency: string, grossMinor: number, perActiveUserMinor: number | null }>
  channels: Array<{ channel: string, chats: number, messages: number }>
  automation: {
    automated: number
    accepted: number
    manualOrDeclined: number
    unclassified: number
    total: number
    automatedRate: number | null
    acceptedRate: number | null
    manualOrDeclinedRate: number | null
  }
}

export interface ActivityOverviewMetric {
  metricId: 'activity-overview'
  granularity: 'day' | 'week' | 'month'
  current: ActivityPeriod
  previous: ActivityPeriod
  series: ActivityPeriod[]
}

export interface NumberStatistics {
  startDate: string
  endDate: string
  granularity: 'day' | 'week' | 'month'
  series: Array<{ startDate: string, endDate: string, count: number | null }>
  updatedAt: string
  history: { available: boolean, from: string | null, through: string | null, checkedAt: string, partial: boolean }
  authorizationLosses: number | null
  affectedNumbers: number | null
  nonWarmingAffected: number | null
  nonWarmingRate: number | null
  pipeline: { total: number, warming: number, nonWarming: number, unassigned: number, knownNumbers: number, withoutPhone: number }
  connectionStatus: Array<{ id: string, label: string, warming: number, nonWarming: number, unassigned: number }>
  daily: Array<{ date: string, count: number }>
}
