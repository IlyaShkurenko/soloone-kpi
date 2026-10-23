<script setup lang="ts">
import type { NumberStatistics } from '~/types/kpi'

const props = defineProps<{ startDate: string, endDate: string }>()
const config = useRuntimeConfig()
const data = ref<NumberStatistics | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
let version = 0
let controller: AbortController | null = null
let timer: ReturnType<typeof setInterval> | null = null
let debounce: ReturnType<typeof setTimeout> | null = null
let mounted = false

async function refresh() {
  const current = ++version
  controller?.abort()
  controller = new AbortController()
  if (props.startDate && props.endDate && props.startDate > props.endDate) {
    loading.value = false
    return
  }
  loading.value = true
  error.value = null
  try {
    const result = await $fetch<NumberStatistics>(`${config.public.apiBase}/api/kpi/numbers`, {
      query: { startDate: props.startDate || undefined, endDate: props.endDate || undefined },
      signal: controller.signal
    })
    if (current === version) data.value = result
  } catch (err) {
    if (current === version) {
      data.value = null
      error.value = err instanceof Error ? err.message : 'Failed to load number statistics'
    }
  } finally {
    if (current === version) loading.value = false
  }
}
watch(() => [props.startDate, props.endDate], () => {
  version++
  controller?.abort()
  data.value = null
  if (!mounted) return
  if (debounce) clearTimeout(debounce)
  debounce = setTimeout(() => {
    void refresh()
  }, 180)
}, { flush: 'sync' })
onMounted(() => {
  mounted = true
  void refresh()
  timer = setInterval(() => {
    if (!loading.value) void refresh()
  }, 86400000)
})
onBeforeUnmount(() => {
  version++
  controller?.abort()
  if (timer) clearInterval(timer)
  if (debounce) clearTimeout(debounce)
})
const cards = computed(() => data.value
  ? [
      { label: 'Authorization losses', value: data.value.authorizationLosses ?? '—', note: 'Recorded losses of authorization; repeated status updates count once.' },
      { label: 'Numbers affected', value: data.value.affectedNumbers ?? '—', note: 'Distinct registered channels with an authorization loss in this range.' },
      { label: 'Non-warming Numbers Disconnected', value: data.value.nonWarmingAffected ?? '—', note: `Among the current ${data.value.pipeline.nonWarming} channels outside warm-up.` },
      { label: 'Non-warming Disconnection Rate', value: data.value.nonWarmingRate === null ? '—' : `${(data.value.nonWarmingRate * 100).toFixed(1)}%`, note: 'Affected channels ÷ current channels outside warm-up.' }
    ]
  : [])
const pipeline = computed(() => data.value
  ? [
      { label: 'Assigned to warm-up', count: data.value.pipeline.warming },
      { label: 'Outside warm-up · ready + active', count: data.value.pipeline.nonWarming }
    ]
  : [])
const lossTrend = computed(() => (data.value?.series ?? []).map(period => ({
  label: period.startDate === period.endDate ? period.startDate : `${period.startDate} – ${period.endDate}`,
  value: period.count
})))
</script>

<template>
  <section
    class="space-y-5 min-w-0"
    aria-label="WhatsApp and number statistics"
  >
    <div>
      <h2 class="text-lg font-semibold">
        WhatsApp &amp; numbers
      </h2>
      <p class="text-sm text-zinc-500 mt-1">
        All registered Whapi channels · Date filter applies to authorization losses · Updated once daily.
      </p>
    </div>
    <div
      v-if="error"
      class="kpi-panel p-5 text-rose-700"
    >
      {{ error }}
    </div>
    <div
      v-else-if="!data && loading"
      class="kpi-panel p-5 text-zinc-500"
    >
      Loading number statistics…
    </div>
    <template v-if="data">
      <p class="text-sm text-zinc-500">
        {{ data.startDate }} – {{ data.endDate }} · UTC
      </p>
      <p
        v-if="!data.history.available"
        class="text-sm text-amber-600"
      >
        Authorization history is unavailable. Missing history is not counted as zero.
      </p>
      <p
        v-else-if="data.history.partial"
        class="text-sm text-amber-600"
      >
        Partial history: the retained server log does not cover the whole selected period. Counts show only recorded events.
      </p>
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="card in cards"
          :key="card.label"
          class="kpi-panel p-5"
        >
          <h3 class="font-medium">
            {{ card.label }}
          </h3>
          <p class="text-3xl font-semibold text-teal-700 tabular-nums mt-4">
            {{ card.value }}
          </p>
          <p class="text-sm text-zinc-500 mt-2">
            {{ card.note }}
          </p>
        </article>
      </div>
      <article class="kpi-panel p-5 space-y-5">
        <div>
          <h3 class="font-medium">
            Number pipeline · current
          </h3>
          <p class="text-sm text-zinc-500 mt-2">
            {{ data.pipeline.total }} registered channels. Purchased SIMs without a registered channel are not included.
          </p>
        </div>
        <div
          v-for="stage in pipeline"
          :key="stage.label"
          class="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)_40px] sm:items-center"
        >
          <span class="text-sm">{{ stage.label }}</span>
          <div class="h-5 rounded-md bg-teal-600/10 overflow-hidden">
            <div
              class="h-full rounded-md bg-teal-600 dark:bg-teal-400"
              :style="{ width: `${data.pipeline.total ? stage.count / data.pipeline.total * 100 : 0}%` }"
            />
          </div>
          <span class="tabular-nums">{{ stage.count }}</span>
        </div>
        <p class="text-sm text-zinc-500">
          Current saved connection states; this is not a live Whapi health check or a historical snapshot.
        </p>
        <table class="w-full text-sm">
          <thead>
            <tr class="text-zinc-500">
              <th class="text-left py-2">
                State
              </th><th class="text-right">
                Warming
              </th><th class="text-right">
                Outside warm-up
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in data.connectionStatus"
              :key="row.id"
              class="border-t border-black/10"
            >
              <td class="py-3">
                {{ row.label }}
              </td><td class="text-right tabular-nums">
                {{ row.warming }}
              </td><td class="text-right tabular-nums">
                {{ row.nonWarming }}
              </td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="kpi-panel p-5 space-y-3">
        <h3 class="font-medium">
          WhatsApp Blocks / Block Rate
        </h3>
        <p class="text-sm text-zinc-500">
          — No confirmed WhatsApp ban history. Authorization loss and provider subscription blocks are not treated as WhatsApp bans.
        </p>
      </article>
      <article class="kpi-panel p-5 space-y-3">
        <h3 class="font-medium">
          Authorization losses by day
        </h3>
        <table
          v-if="data.history.available && data.daily.length"
          class="w-full text-sm"
        >
          <thead>
            <tr class="text-zinc-500">
              <th class="text-left py-2">
                Date · UTC
              </th><th class="text-right">
                Authorization losses
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="day in data.daily"
              :key="day.date"
              class="border-t border-black/10"
            >
              <td class="py-3">
                {{ day.date }}
              </td><td class="text-right tabular-nums">
                {{ day.count }}
              </td>
            </tr>
          </tbody>
        </table>
        <p
          v-else
          class="text-sm text-zinc-500"
        >
          {{ data.history.available ? 'No authorization losses recorded in the available history for this range.' : 'History unavailable.' }}
        </p>
        <p class="text-xs text-zinc-500">
          Source: retained server state log. Explicit disconnects and temporary starting/creating states are excluded. Warm-up groups use current assignments.
        </p>
      </article>
      <article
        v-if="data.history.available && lossTrend.length"
        class="kpi-panel p-5"
      >
        <h3 class="font-medium">
          Authorization losses over time
        </h3>
        <p class="text-sm text-zinc-500 mt-2">
          Each bar shows {{ data.granularity === 'month' ? 'a calendar month' : data.granularity === 'day' ? 'a day' : 'a week' }} within the selected range. Edge periods may be partial.
        </p>
        <KpiSparkBars :points="lossTrend" />
      </article>
    </template>
  </section>
</template>
