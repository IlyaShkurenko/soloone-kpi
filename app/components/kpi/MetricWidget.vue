<script setup lang="ts">
import type { FirstAiInteractionMetric, MetricDescriptor } from '~/types/kpi'

const props = defineProps<{
  descriptor: MetricDescriptor
  data: FirstAiInteractionMetric | null
  loading?: boolean
  error?: string | null
}>()

function formatDuration(value: number | null): string {
  if (value === null || Number.isNaN(value)) {
    return '—'
  }

  if (value >= 48) {
    return `${(value / 24).toFixed(1)}d`
  }

  return `${value.toFixed(1)}h`
}

function formatPercent(value: number): string {
  return `${(value * 100).toFixed(0)}%`
}

const summaryItems = computed(() => {
  if (!props.data) {
    return []
  }

  return [
    { label: 'Average', value: formatDuration(props.data.summary.averageHours) },
    { label: 'Median', value: formatDuration(props.data.summary.medianHours) },
    { label: 'Min', value: formatDuration(props.data.summary.minHours) },
    { label: 'Max', value: formatDuration(props.data.summary.maxHours) },
    { label: 'Coverage', value: formatPercent(props.data.summary.coverageRate) },
    { label: 'Users', value: `${props.data.summary.usersWithAiInteraction}/${props.data.summary.totalUsers}` }
  ]
})

const chartPoints = computed(() => {
  if (!props.data) {
    return []
  }

  return props.data.series.map((point) => ({
    label: formatBucketLabel(point.bucketStart, props.data!.granularity),
    value: point.averageHours
  }))
})

function formatBucketLabel(value: string, granularity: 'day' | 'week' | 'month'): string {
  const date = new Date(`${value}T00:00:00Z`)

  if (granularity === 'month') {
    return new Intl.DateTimeFormat('en-GB', { month: 'short', year: '2-digit' }).format(date)
  }

  if (granularity === 'week') {
    return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short' }).format(date)
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
          class="rounded-2xl bg-teal-700 text-white px-4 py-3 min-w-52"
        >
          <p class="text-xs uppercase tracking-[0.2em] text-white/70">Headline</p>
          <p class="text-2xl font-semibold mt-2">{{ formatDuration(data.summary.averageHours) }}</p>
          <p class="text-sm text-white/72 mt-1">Avg time from signup to first AI reply</p>
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
        <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          <div
            v-for="item in summaryItems"
            :key="item.label"
            class="rounded-2xl border border-black/8 bg-white/72 px-4 py-4"
          >
            <p class="text-xs uppercase tracking-[0.18em] text-zinc-500">{{ item.label }}</p>
            <p class="text-xl font-semibold text-zinc-950 mt-2">{{ item.value }}</p>
          </div>
        </div>

        <div class="space-y-3">
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-xs uppercase tracking-[0.18em] text-zinc-500">Trend</p>
              <h3 class="text-lg font-semibold text-zinc-950">Average time by signup cohort</h3>
            </div>
            <p class="text-sm text-zinc-500">Start point = signup timestamp</p>
          </div>

          <KpiLineChart
            :points="chartPoints"
            :value-formatter="(value) => formatDuration(value)"
          />
        </div>
      </template>
    </div>
  </section>
</template>
