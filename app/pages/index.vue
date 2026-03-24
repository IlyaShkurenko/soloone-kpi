<script setup lang="ts">
import type {
  FirstAiInteractionMetric,
  KpiUserOption,
  MetricDescriptor
} from '~/types/kpi'

type MetricState = {
  loading: boolean
  error: string | null
  data: FirstAiInteractionMetric | null
}

const config = useRuntimeConfig()

const availableMetrics: MetricDescriptor[] = [
  {
    id: 'first-ai-interaction',
    label: 'Time to First AI Interaction',
    description: 'Measures the time from estimated onboarding completion to the first successful AI-generated outgoing message.'
  }
]

const presetOptions = [
  { id: '30d', label: '30D', days: 30 },
  { id: '90d', label: '90D', days: 90 },
  { id: '180d', label: '180D', days: 180 },
  { id: '365d', label: '1Y', days: 365 },
  { id: 'all', label: 'All Time', days: null }
] as const

const users = ref<KpiUserOption[]>([])
const userSearch = ref('')
const usersLoading = ref(false)
const usersError = ref<string | null>(null)

const selectedMetricIds = ref<string[]>(['first-ai-interaction'])
const selectedUserIds = ref<string[]>([])
const startDate = ref('')
const endDate = ref('')
const activePreset = ref<string>('90d')

const metricStates = reactive<Record<string, MetricState>>({
  'first-ai-interaction': {
    loading: false,
    error: null,
    data: null
  }
})

let refreshTimeout: ReturnType<typeof setTimeout> | null = null

const filteredUsers = computed(() => {
  const query = userSearch.value.trim().toLowerCase()
  if (!query) {
    return users.value
  }

  return users.value.filter((user) => user.label.toLowerCase().includes(query))
})

const selectedMetricDescriptors = computed(() =>
  availableMetrics.filter((metric) => selectedMetricIds.value.includes(metric.id))
)

const allUsersSelected = computed(() =>
  users.value.length > 0 && selectedUserIds.value.length === users.value.length
)

function toDateInputValue(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function applyPreset(days: number | null, presetId: string) {
  activePreset.value = presetId

  if (days === null) {
    startDate.value = ''
    endDate.value = ''
    return
  }

  const end = new Date()
  const start = new Date()
  start.setUTCDate(end.getUTCDate() - (days - 1))

  startDate.value = toDateInputValue(start)
  endDate.value = toDateInputValue(end)
}

function handleCustomDateChange() {
  activePreset.value = 'custom'
}

function toggleUser(userId: string) {
  if (selectedUserIds.value.includes(userId)) {
    if (selectedUserIds.value.length === 1) {
      return
    }

    selectedUserIds.value = selectedUserIds.value.filter(id => id !== userId)
    return
  }

  selectedUserIds.value = [...selectedUserIds.value, userId]
}

function selectAllUsers() {
  selectedUserIds.value = users.value.map(user => user.id)
}

function resetUsersToAll() {
  selectedUserIds.value = users.value.map(user => user.id)
}

function toggleMetric(metricId: string) {
  if (selectedMetricIds.value.includes(metricId)) {
    if (selectedMetricIds.value.length === 1) {
      return
    }

    selectedMetricIds.value = selectedMetricIds.value.filter(id => id !== metricId)
    return
  }

  selectedMetricIds.value = [...selectedMetricIds.value, metricId]
}

async function fetchUsers() {
  usersLoading.value = true
  usersError.value = null

  try {
    const data = await $fetch<KpiUserOption[]>(`${config.public.apiBase}/api/kpi/users`)
    users.value = data
    selectedUserIds.value = data.map(user => user.id)
  } catch (error: any) {
    usersError.value = error?.data?.error || error?.message || 'Failed to load users'
  } finally {
    usersLoading.value = false
  }
}

function buildMetricQuery(): Record<string, string> {
  const query: Record<string, string> = {}

  if (startDate.value) {
    query.startDate = startDate.value
  }

  if (endDate.value) {
    query.endDate = endDate.value
  }

  if (selectedUserIds.value.length > 0 && selectedUserIds.value.length < users.value.length) {
    query.userIds = selectedUserIds.value.join(',')
  }

  return query
}

async function fetchFirstAiInteractionMetric() {
  const state = metricStates['first-ai-interaction']!
  state.loading = true
  state.error = null

  try {
    state.data = await $fetch<FirstAiInteractionMetric>(
      `${config.public.apiBase}/api/kpi/metrics/first-ai-interaction`,
      {
        query: buildMetricQuery()
      }
    )
  } catch (error: any) {
    state.error = error?.data?.error || error?.message || 'Failed to load metric'
    state.data = null
  } finally {
    state.loading = false
  }
}

async function refreshMetrics() {
  const loaders = selectedMetricIds.value.map(async (metricId) => {
    if (metricId === 'first-ai-interaction') {
      await fetchFirstAiInteractionMetric()
    }
  })

  await Promise.all(loaders)
}

function queueRefresh() {
  if (refreshTimeout) {
    clearTimeout(refreshTimeout)
  }

  refreshTimeout = setTimeout(() => {
    void refreshMetrics()
  }, 180)
}

watch([startDate, endDate, selectedUserIds, selectedMetricIds], () => {
  if (usersLoading.value || usersError.value) {
    return
  }

  queueRefresh()
}, { deep: true })

onMounted(async () => {
  applyPreset(90, '90d')
  await fetchUsers()
  await refreshMetrics()
})
</script>

<template>
  <main class="kpi-shell px-4 py-5 md:px-6 lg:px-8">
    <div class="max-w-[1500px] mx-auto space-y-6">
      <section class="relative overflow-hidden rounded-[32px] kpi-panel">
        <div class="absolute inset-0 kpi-grid opacity-70" />

        <div class="relative px-6 py-8 md:px-8 lg:px-10">
          <div class="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
            <div class="max-w-3xl">
              <p class="text-xs uppercase tracking-[0.28em] text-zinc-500">SoloOne KPI</p>
              <h1 class="text-4xl md:text-5xl font-semibold text-zinc-950 mt-3">
                KPI Dashboard
              </h1>
              <p class="text-base md:text-lg text-zinc-600 mt-4 max-w-2xl">
                One public page with shared filters, selectable metrics, and progressively added KPI widgets.
              </p>
            </div>

            <div class="grid gap-3 sm:grid-cols-3 min-w-full xl:min-w-[520px] xl:max-w-[560px]">
              <div class="rounded-2xl bg-white/72 border border-black/8 px-4 py-4">
                <p class="text-xs uppercase tracking-[0.18em] text-zinc-500">Metrics Selected</p>
                <p class="text-2xl font-semibold mt-2">{{ selectedMetricIds.length }}</p>
              </div>
              <div class="rounded-2xl bg-white/72 border border-black/8 px-4 py-4">
                <p class="text-xs uppercase tracking-[0.18em] text-zinc-500">Users in Scope</p>
                <p class="text-2xl font-semibold mt-2">{{ selectedUserIds.length || users.length }}</p>
              </div>
              <div class="rounded-2xl bg-white/72 border border-black/8 px-4 py-4">
                <p class="text-xs uppercase tracking-[0.18em] text-zinc-500">Range</p>
                <p class="text-base font-semibold mt-2">
                  {{ activePreset === 'custom' ? 'Custom' : activePreset.toUpperCase() }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <aside class="space-y-6">
          <section class="kpi-panel rounded-[28px] px-5 py-5 space-y-4">
            <div>
              <p class="text-xs uppercase tracking-[0.18em] text-zinc-500">Global Filters</p>
              <h2 class="text-xl font-semibold text-zinc-950 mt-2">Range</h2>
            </div>

            <div class="flex flex-wrap gap-2">
              <UButton
                v-for="preset in presetOptions"
                :key="preset.id"
                :variant="activePreset === preset.id ? 'solid' : 'outline'"
                color="neutral"
                size="sm"
                @click="applyPreset(preset.days, preset.id)"
              >
                {{ preset.label }}
              </UButton>
            </div>

            <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <label class="space-y-1.5">
                <span class="text-xs uppercase tracking-[0.16em] kpi-label">Start Date</span>
                <input
                  v-model="startDate"
                  type="date"
                  class="w-full rounded-xl border border-black/10 bg-white/78 px-3 py-2.5 outline-none"
                  @change="handleCustomDateChange"
                >
              </label>

              <label class="space-y-1.5">
                <span class="text-xs uppercase tracking-[0.16em] kpi-label">End Date</span>
                <input
                  v-model="endDate"
                  type="date"
                  class="w-full rounded-xl border border-black/10 bg-white/78 px-3 py-2.5 outline-none"
                  @change="handleCustomDateChange"
                >
              </label>
            </div>
          </section>

          <section class="kpi-panel rounded-[28px] px-5 py-5 space-y-4">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-xs uppercase tracking-[0.18em] text-zinc-500">Global Filters</p>
                <h2 class="text-xl font-semibold text-zinc-950 mt-2">Users</h2>
              </div>
              <div class="flex gap-2">
                <UButton
                  variant="outline"
                  color="neutral"
                  size="xs"
                  @click="selectAllUsers"
                >
                  All
                </UButton>
                <UButton
                  variant="outline"
                  color="neutral"
                  size="xs"
                  @click="resetUsersToAll"
                >
                  Reset
                </UButton>
              </div>
            </div>

            <UInput
              v-model="userSearch"
              icon="i-lucide-search"
              placeholder="Search users"
            />

            <div
              v-if="usersLoading"
              class="rounded-2xl border border-black/8 bg-white/70 px-4 py-6 text-sm text-zinc-500"
            >
              Loading users…
            </div>

            <div
              v-else-if="usersError"
              class="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm text-rose-700"
            >
              {{ usersError }}
            </div>

            <div
              v-else
              class="rounded-2xl border border-black/8 bg-white/70 overflow-hidden"
            >
              <div class="flex items-center justify-between px-4 py-3 border-b border-black/8 text-sm">
                <span class="text-zinc-600">Selected {{ selectedUserIds.length }} of {{ users.length }}</span>
                <span
                  v-if="allUsersSelected"
                  class="text-teal-700 font-medium"
                >
                  All active users
                </span>
              </div>

              <div class="max-h-72 overflow-y-auto px-3 py-2 space-y-1.5">
                <label
                  v-for="user in filteredUsers"
                  :key="user.id"
                  class="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-zinc-100/80 cursor-pointer"
                >
                  <input
                    :checked="selectedUserIds.includes(user.id)"
                    type="checkbox"
                    class="h-4 w-4 rounded border-black/20"
                    @change="toggleUser(user.id)"
                  >
                  <span class="text-sm text-zinc-800">{{ user.label }}</span>
                </label>
              </div>
            </div>
          </section>

          <section class="kpi-panel rounded-[28px] px-5 py-5 space-y-4">
            <div>
              <p class="text-xs uppercase tracking-[0.18em] text-zinc-500">Display</p>
              <h2 class="text-xl font-semibold text-zinc-950 mt-2">Metrics</h2>
            </div>

            <div class="space-y-2">
              <label
                v-for="metric in availableMetrics"
                :key="metric.id"
                class="block rounded-2xl border border-black/8 bg-white/72 px-4 py-3 cursor-pointer"
              >
                <div class="flex items-start gap-3">
                  <input
                    :checked="selectedMetricIds.includes(metric.id)"
                    type="checkbox"
                    class="mt-1 h-4 w-4 rounded border-black/20"
                    @change="toggleMetric(metric.id)"
                  >
                  <div>
                    <p class="font-medium text-zinc-950">{{ metric.label }}</p>
                    <p class="text-sm text-zinc-600 mt-1">{{ metric.description }}</p>
                  </div>
                </div>
              </label>
            </div>
          </section>
        </aside>

        <div class="space-y-6">
          <KpiMetricWidget
            v-for="metric in selectedMetricDescriptors"
            :key="metric.id"
            :descriptor="metric"
            :data="metricStates[metric.id]?.data ?? null"
            :loading="metricStates[metric.id]?.loading"
            :error="metricStates[metric.id]?.error"
          />
        </div>
      </section>
    </div>
  </main>
</template>
