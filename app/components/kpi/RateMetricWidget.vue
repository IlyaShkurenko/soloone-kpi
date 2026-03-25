<script setup lang="ts">
import type { AiAutomationRateMetric, MetricDescriptor } from '~/types/kpi'

const props = defineProps<{
  descriptor: MetricDescriptor
  data: AiAutomationRateMetric | null
  loading?: boolean
  error?: string | null
}>()

function formatPercent(value: number): string {
  return `${(value * 100).toFixed(0)}%`
}

const summaryItems = computed(() => {
  if (!props.data) {
    return []
  }

  return [
    { label: 'Automation Rate', value: formatPercent(props.data.summary.autoSentRate) },
    { label: 'Auto-Sent', value: String(props.data.summary.autoSentReplies) },
    { label: 'Reviewed', value: String(props.data.summary.reviewedReplies) },
    { label: 'Coverage', value: formatPercent(props.data.summary.coverageRate) },
    { label: 'Users', value: `${props.data.summary.usersWithMetric}/${props.data.summary.totalUsers}` }
  ]
})

const chartPoints = computed(() => {
  if (!props.data) {
    return []
  }

  return props.data.series.map((point) => ({
    label: formatBucketLabel(point.bucketStart, props.data!.granularity),
    value: point.autoSentRate,
    userLabels: point.userLabels
  }))
})

function formatBucketLabel(value: string, granularity: 'day' | 'week' | 'month'): string {
  const date = new Date(`${value}T00:00:00Z`)

  if (granularity === 'month') {
    return new Intl.DateTimeFormat('en-GB', { month: 'short', year: '2-digit' }).format(date)
  }

  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short' }).format(date)
}
</script>

<template>
  <section class="kpi-panel rounded-[28px] overflow-hidden">
    <div class="px-6 py-5 border-b border-black/8">
      <div class="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <p class="text-xs uppercase tracking-[0.24em] text-zinc-500">{{ descriptor.id }}</p>
          <h2 class="text-2xl font-semibold text-zinc-950 mt-2">{{ descriptor.label }}</h2>
          <p class="text-sm text-zinc-600 mt-2 max-w-3xl">{{ descriptor.description }}</p>
        </div>

        <div
          v-if="data"
          class="rounded-2xl bg-teal-700 text-white px-6 py-5 min-w-64"
        >
          <p class="text-xs uppercase tracking-[0.2em] text-white/70">Headline</p>
          <p class="text-2xl font-semibold mt-2">{{ formatPercent(data.summary.autoSentRate) }}</p>
          <p class="text-sm text-white/72 mt-1">{{ descriptor.headlineDescription }}</p>
        </div>
      </div>
    </div>

    <div class="px-6 py-6 space-y-6">
      <div
        v-if="loading"
        class="rounded-2xl border border-black/8 bg-white/70 px-4 py-10 text-center text-zinc-500"
      >
        Loading metric…
      </div>

      <div
        v-else-if="error"
        class="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-5 text-rose-700"
      >
        {{ error }}
      </div>

      <template v-else-if="data">
        <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <div
            v-for="item in summaryItems"
            :key="item.label"
            class="rounded-2xl border border-black/8 bg-white/72 px-4 py-4"
          >
            <p class="text-xs uppercase tracking-[0.18em] text-zinc-500">{{ item.label }}</p>
            <p class="text-xl font-semibold text-zinc-950 mt-2">{{ item.value }}</p>
          </div>
        </div>

        <div class="rounded-2xl border border-black/8 bg-white/60 px-4 py-4">
          <p class="text-xs uppercase tracking-[0.18em] text-zinc-500">Successful AI Replies</p>
          <p class="text-2xl font-semibold text-zinc-950 mt-2">{{ data.summary.totalSuccessfulAiReplies }}</p>
          <p class="text-sm text-zinc-500 mt-1">Recorded auto-sent vs approved-and-sent AI outgoing replies.</p>
        </div>

        <div class="space-y-3">
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-xs uppercase tracking-[0.18em] text-zinc-500">Trend</p>
              <h3 class="text-lg font-semibold text-zinc-950">{{ descriptor.trendTitle }}</h3>
            </div>
            <p class="text-sm text-zinc-500">{{ descriptor.trendHint }}</p>
          </div>

          <KpiLineChart
            :points="chartPoints"
            :value-formatter="(value) => formatPercent(value)"
          />
        </div>
      </template>
    </div>
  </section>
</template>
