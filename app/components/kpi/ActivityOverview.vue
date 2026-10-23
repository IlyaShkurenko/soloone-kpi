<script setup lang="ts">
import type { ActivityOverviewMetric, ActivityPeriod } from '~/types/kpi'

const props = defineProps<{
  data: ActivityOverviewMetric | null
  loading?: boolean
  error?: string | null
}>()
const channelMode = ref<'chats' | 'messages'>('chats')
const currencies = computed(() => [...new Set([
  ...(props.data?.series ?? []), ...(props.data ? [props.data.current] : [])
].flatMap(period => period.revenue.map(item => item.currency)))].sort())
const channels = computed(() => [
  { id: 'whatsapp', label: 'WhatsApp' }, { id: 'soloone', label: 'Fan2You' },
  { id: 'telegram', label: 'Telegram' }, { id: 'sms', label: 'SMS' }
].sort((a, b) => props.data
  ? channelCount(props.data.current, b.id) - channelCount(props.data.current, a.id)
  : 0))
const categories = [
  { key: 'automatedRate', count: 'automated', label: 'Fully Automated', description: 'AI replies sent without approval', color: 'bg-teal-600' },
  { key: 'acceptedRate', count: 'accepted', label: 'AI-Draft accepted', description: 'Approved and sent, including edited drafts', color: 'bg-sky-500' },
  { key: 'manualOrDeclinedRate', count: 'manualOrDeclined', label: 'Not automated / AI-Draft declined', description: 'Non-AI messages and cancelled drafts', color: 'bg-zinc-500' }
] as const

function shortDate(value: string) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`))
}
function periodLabel(period: ActivityPeriod) {
  if (period.startDate === period.endDate) return shortDate(period.startDate)
  return `${shortDate(period.startDate)} – ${shortDate(period.endDate)}`
}
function percent(value: number | null) {
  return value === null ? '—' : `${(value * 100).toFixed(1)}%`
}
function automationPercent(period: ActivityPeriod, category: typeof categories[number]['count']) {
  const total = period.automation.total
  if (!total) return '—'
  // Allocate tenths by largest remainder so displayed shares total exactly 100%.
  const shares = categories.map(({ count }) => {
    const scaled = period.automation[count] * 1000
    return { count, tenths: Math.floor(scaled / total), remainder: scaled % total }
  })
  const missing = 1000 - shares.reduce((sum, share) => sum + share.tenths, 0)
  const ranked = [...shares].sort((a, b) => b.remainder - a.remainder)
  for (let i = 0; i < missing; i++) ranked[i]!.tenths++
  return `${(shares.find(share => share.count === category)!.tenths / 10).toFixed(1)}%`
}
function money(value: number | null, currency: string) {
  if (value === null) return '—'
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency, maximumFractionDigits: 2 }).format(value / 100)
}
function revenue(period: ActivityPeriod, currency: string, perUser = false) {
  const item = period.revenue.find(row => row.currency === currency)
  return perUser ? (period.activeUsers ? (item?.perActiveUserMinor ?? 0) : null) : (item?.grossMinor ?? 0)
}
function channelCount(period: ActivityPeriod, channel: string) {
  return period.channels.find(row => row.channel === channel)?.[channelMode.value] ?? 0
}
function channelShare(period: ActivityPeriod, channel: string) {
  const total = channelMode.value === 'chats' ? period.activeChats : period.messages
  return percent(total > 0 ? channelCount(period, channel) / total : null)
}
</script>

<template>
  <section
    class="space-y-5"
    aria-label="Activity overview"
  >
    <div
      v-if="loading"
      class="kpi-panel rounded-xl p-8 text-center text-zinc-500"
    >
      Loading activity overview…
    </div>
    <div
      v-else-if="error"
      class="kpi-panel rounded-xl p-5 text-rose-700"
    >
      {{ error }}
    </div>
    <template v-else-if="data">
      <div>
        <h2 class="text-lg font-semibold">
          Activity overview · {{ periodLabel(data.current) }}
        </h2>
        <p class="text-sm text-zinc-500 mt-1">
          Totals cover the selected date range · Bars show {{ data.granularity === 'month' ? 'months' : data.granularity === 'day' ? 'days' : 'weeks' }} within this range
        </p>
      </div>

      <div class="grid gap-4 xl:grid-cols-3">
        <article class="kpi-panel rounded-xl p-5">
          <h3 class="font-medium">
            Active Users
          </h3>
          <p class="text-sm text-zinc-500 mt-2">
            Creators who sent messages manually or approved AI drafts
          </p>
          <p class="text-3xl font-semibold text-teal-700 tabular-nums mt-4">
            {{ data.current.activeUsers }}
          </p>
          <KpiSparkBars :points="data.series.map(period => ({ label: periodLabel(period), value: period.activeUsers }))" />
        </article>
        <article
          v-for="perUser in [false, true]"
          :key="String(perUser)"
          class="kpi-panel rounded-xl p-5"
        >
          <h3 class="font-medium">
            {{ perUser ? 'Revenue per Active User' : 'Total Revenue (GMV)' }}
          </h3>
          <p class="text-sm text-zinc-500 mt-2">
            {{ perUser ? 'GMV ÷ creators with manual or approved sends' : 'Gross completed creator revenue' }}
          </p>
          <p
            v-if="!currencies.length"
            class="text-zinc-500 mt-5"
          >
            No completed revenue in this range.
          </p>
          <div
            v-for="currency in currencies"
            :key="currency"
            class="mt-4"
          >
            <p class="text-3xl font-semibold text-teal-700 tabular-nums">
              {{ money(revenue(data.current, currency, perUser), currency) }} <span class="text-xs text-zinc-500">{{ currency }}</span>
            </p>
            <KpiSparkBars
              :points="data.series.map(period => ({ label: periodLabel(period), value: revenue(period, currency, perUser) }))"
              :formatter="value => money(value, currency)"
            />
          </div>
        </article>
      </div>

      <h2 class="text-lg font-semibold pt-2">
        Chats
      </h2>
      <div class="grid gap-4 xl:grid-cols-2">
        <article class="kpi-panel rounded-xl p-5">
          <h3 class="font-medium">
            Total Active Chats
          </h3>
          <p class="text-sm text-zinc-500 mt-2">
            Conversations with sent or received messages
          </p>
          <p class="text-3xl font-semibold text-teal-700 tabular-nums mt-4">
            {{ data.current.activeChats }}
          </p>
          <KpiSparkBars :points="data.series.map(period => ({ label: periodLabel(period), value: period.activeChats }))" />
        </article>
        <article class="kpi-panel rounded-xl p-5 min-w-0">
          <div class="flex items-center justify-between gap-3">
            <h3 class="font-medium">
              Channel split
            </h3>
            <div class="flex gap-1">
              <UButton
                v-for="mode in (['chats', 'messages'] as const)"
                :key="mode"
                size="xs"
                color="primary"
                :variant="channelMode === mode ? 'solid' : 'outline'"
                @click="channelMode = mode"
              >
                {{ mode === 'chats' ? 'Chats' : 'Messages' }}
              </UButton>
            </div>
          </div>
          <div class="overflow-x-auto mt-4">
            <table class="w-full text-sm whitespace-nowrap">
              <thead class="text-xs text-zinc-500">
                <tr>
                  <th class="text-left py-2 font-normal">
                    Channel
                  </th><th class="font-normal text-right px-3">
                    {{ channelMode === 'chats' ? 'Chats' : 'Messages' }}
                  </th><th class="font-normal text-right px-3">
                    Share
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="channel in channels"
                  :key="channel.id"
                  class="border-t border-black/10"
                >
                  <td class="py-3">
                    {{ channel.label }}
                  </td><td class="text-right px-3 tabular-nums">
                    {{ channelCount(data.current, channel.id) }}
                  </td><td class="text-right px-3">
                    {{ channelShare(data.current, channel.id) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      </div>

      <div class="pt-2">
        <h2 class="text-lg font-semibold">
          Message Automation
        </h2>
        <p class="text-sm text-zinc-500 mt-1">
          Share of recorded outcomes: sent messages and declined drafts.
        </p>
      </div>
      <div class="grid gap-4 xl:grid-cols-3">
        <article
          v-for="category in categories"
          :key="category.key"
          class="kpi-panel rounded-xl p-5"
        >
          <h3 class="font-medium">
            {{ category.label }}
          </h3>
          <p class="text-sm text-zinc-500 mt-2">
            {{ category.description }}
          </p>
          <p class="text-3xl font-semibold text-teal-700 tabular-nums mt-4">
            {{ automationPercent(data.current, category.count) }}
          </p>
          <p class="text-xs text-zinc-500 mt-2">
            {{ data.current.automation[category.count] }} outcomes
          </p>
        </article>
      </div>
      <article class="kpi-panel rounded-xl p-5">
        <h3 class="font-medium">
          Trend: share by outcome
        </h3>
        <p class="text-sm text-zinc-500 mt-2">
          The three categories add up to 100%. Empty periods have no bar.
        </p>
        <p
          v-if="data.series.some(period => period.automation.unclassified > 0)"
          class="text-sm text-amber-700 dark:text-amber-300 mt-2"
        >
          {{ data.series.reduce((sum, period) => sum + period.automation.unclassified, 0) }} historical AI messages have no recorded approval/auto-send outcome and are excluded from these percentages.
          Latest period: {{ data.current.automation.unclassified }} unclassified.
        </p>
        <div class="flex flex-wrap gap-4 text-xs text-zinc-500 mt-4">
          <span
            v-for="category in categories"
            :key="category.key"
            class="flex items-center gap-2"
          ><span
            class="w-2.5 h-2.5 rounded-sm"
            :class="category.color"
          />{{ category.label }}</span>
        </div>
        <div class="flex gap-3 mt-6">
          <div class="h-48 flex flex-col justify-between text-xs text-zinc-500">
            <span>100%</span><span>50%</span><span>0%</span>
          </div>
          <div class="flex-1 min-w-0">
            <div
              class="flex gap-2 h-48 border-b border-black/10"
              role="img"
              aria-label="Automation outcome distribution over time"
            >
              <div
                v-for="period in data.series"
                :key="period.startDate"
                class="flex-1 min-w-0 h-full flex flex-col-reverse group relative"
                tabindex="0"
                :aria-label="`${periodLabel(period)}: ${period.automation.total} classified outcomes`"
              >
                <div
                  v-for="category in categories"
                  :key="category.key"
                  :class="category.color"
                  :style="{ height: `${(period.automation[category.key] ?? 0) * 100}%` }"
                />
                <div class="hidden group-hover:block group-focus:block absolute z-20 top-0 left-1/2 -translate-x-1/2 w-56 bg-zinc-950 text-white text-xs rounded-md p-3 shadow-lg pointer-events-none">
                  <p class="font-medium mb-2">
                    {{ periodLabel(period) }}
                  </p>
                  <p
                    v-for="category in categories"
                    :key="category.key"
                    class="mt-1"
                  >
                    {{ category.label }}: {{ automationPercent(period, category.count) }} ({{ period.automation[category.count] }})
                  </p>
                  <p
                    v-if="period.automation.unclassified"
                    class="mt-2"
                  >
                    Unclassified: {{ period.automation.unclassified }}
                  </p>
                </div>
              </div>
            </div>
            <div class="flex justify-between gap-3 text-xs text-zinc-500 mt-2">
              <span>{{ data.series[0] ? periodLabel(data.series[0]) : '' }}</span><span>{{ periodLabel(data.current) }}</span>
            </div>
          </div>
        </div>
      </article>
    </template>
  </section>
</template>
