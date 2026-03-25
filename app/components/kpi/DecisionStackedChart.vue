<script setup lang="ts">
const props = defineProps<{
  points: Array<{
    label: string
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
  }>
}>()

const hoveredPointIndex = ref<number | null>(null)

const visibleLabelIndices = computed(() => {
  if (props.points.length <= 6) {
    return new Set(props.points.map((_, index) => index))
  }

  const middleIndex = Math.floor((props.points.length - 1) / 2)
  return new Set([0, middleIndex, props.points.length - 1])
})

const hoveredPoint = computed(() => {
  if (hoveredPointIndex.value === null) {
    return null
  }

  const point = props.points[hoveredPointIndex.value]
  if (!point) {
    return null
  }

  let alignX: 'left' | 'center' | 'right' = 'center'
  if (hoveredPointIndex.value === 0) {
    alignX = 'left'
  } else if (hoveredPointIndex.value === props.points.length - 1) {
    alignX = 'right'
  }

  return {
    ...point,
    alignX
  }
})

function formatPercent(value: number): string {
  return `${(value * 100).toFixed(0)}%`
}

function formatUserLabelPreview(userLabels: string[]): string {
  if (userLabels.length === 0) {
    return 'No users in bucket'
  }

  if (userLabels.length <= 2) {
    return userLabels.join(', ')
  }

  return `${userLabels.slice(0, 2).join(', ')} +${userLabels.length - 2} more`
}

const segments = [
  { key: 'approvedAsIsRate', countKey: 'approvedAsIsCount', label: 'Approved as-is', color: 'bg-teal-600' },
  { key: 'approvedAfterEditRate', countKey: 'approvedAfterEditCount', label: 'Approved after edit', color: 'bg-sky-500' },
  { key: 'cancelledRate', countKey: 'cancelledCount', label: 'Cancelled', color: 'bg-rose-500' },
  { key: 'regeneratedRate', countKey: 'regeneratedCount', label: 'Regenerated', color: 'bg-amber-400' }
] as const
</script>

<template>
  <div class="relative w-full rounded-2xl border border-black/8 bg-white/70 overflow-visible">
    <div
      v-if="points.length === 0"
      class="h-72 flex items-center justify-center text-sm text-zinc-500"
    >
      No data for the selected filters.
    </div>

    <div
      v-else
      class="px-5 py-5"
    >
      <div class="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-zinc-400">
        <span>100%</span>
        <span>50%</span>
        <span>0%</span>
      </div>

      <div class="mt-4 grid h-72 grid-cols-[repeat(auto-fit,minmax(40px,1fr))] items-end gap-3">
        <div
          v-for="(point, index) in points"
          :key="`${point.label}-${index}`"
          class="relative flex h-full min-w-0 flex-col items-center justify-end"
          @mouseenter="hoveredPointIndex = index"
          @mouseleave="hoveredPointIndex = null"
        >
          <div
            v-if="hoveredPointIndex === index && hoveredPoint"
            class="pointer-events-none absolute top-2 z-20 w-64 rounded-xl bg-zinc-950 px-3 py-3 text-white shadow-lg"
            :class="
              hoveredPoint.alignX === 'left'
                ? 'left-0 translate-x-0'
                : hoveredPoint.alignX === 'right'
                  ? 'right-0 translate-x-0'
                  : 'left-1/2 -translate-x-1/2'
            "
          >
            <p class="text-[11px] uppercase tracking-[0.16em] text-white/60">{{ hoveredPoint.label }}</p>
            <p class="mt-1 text-sm font-medium">{{ hoveredPoint.totalDecisions }} decisions</p>
            <p class="mt-2 text-xs text-white/72">
              {{ hoveredPoint.userLabels.length === 1 ? 'User' : 'Users' }}:
              {{ formatUserLabelPreview(hoveredPoint.userLabels) }}
            </p>
            <div class="mt-3 space-y-1.5 text-xs">
              <div
                v-for="segment in segments"
                :key="segment.key"
                class="flex items-center justify-between gap-3"
              >
                <span class="text-white/72">{{ segment.label }}</span>
                <span class="font-medium">
                  {{ formatPercent(hoveredPoint[segment.key]) }} · {{ hoveredPoint[segment.countKey] }}
                </span>
              </div>
            </div>
          </div>

          <div class="relative flex h-60 w-full items-end">
            <div class="absolute inset-0 rounded-xl border border-black/6 bg-zinc-100/70" />

            <div class="relative flex h-full w-full flex-col-reverse overflow-hidden rounded-xl">
              <div
                v-for="segment in segments"
                :key="segment.key"
                :class="segment.color"
                :style="{ height: `${Math.max(point[segment.key] * 100, point[segment.key] > 0 ? 2 : 0)}%` }"
              />
            </div>
          </div>

          <p
            class="mt-3 text-center text-xs text-zinc-500"
            :class="visibleLabelIndices.has(index) ? 'opacity-100' : 'opacity-0'"
          >
            {{ point.label }}
          </p>
        </div>
      </div>

      <div class="mt-4 flex flex-wrap gap-3 text-xs text-zinc-600">
        <div
          v-for="segment in segments"
          :key="segment.key"
          class="flex items-center gap-2"
        >
          <span
            class="h-2.5 w-2.5 rounded-full"
            :class="segment.color"
          />
          <span>{{ segment.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
