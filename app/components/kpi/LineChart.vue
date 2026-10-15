<script setup lang="ts">
const props = defineProps<{
  points: Array<{ label: string, value: number | null, userLabels?: string[] }>
  valueFormatter?: (value: number) => string
}>()

const chartElement = ref<HTMLDivElement | null>(null)
const width = ref(760)
const height = 240
const padding = { top: 18, right: 32, bottom: 36, left: 64 }
const innerWidth = computed(() => Math.max(0, width.value - padding.left - padding.right))
const pointSpacing = computed(() => innerWidth.value / Math.max(props.points.length - 1, 1))
const innerHeight = height - padding.top - padding.bottom
const hoveredPointIndex = ref<number | null>(null)
let resizeObserver: ResizeObserver | undefined

onMounted(() => {
  resizeObserver = new ResizeObserver(([entry]) => {
    if (entry && entry.contentRect.width > 0) width.value = entry.contentRect.width
  })
  if (chartElement.value) resizeObserver.observe(chartElement.value)
})
onBeforeUnmount(() => resizeObserver?.disconnect())

const validPoints = computed(() =>
  props.points
    .map((point, index) => ({ ...point, index }))
    .filter(point => typeof point.value === 'number' && Number.isFinite(point.value))
)

const minValue = computed(() => {
  if (validPoints.value.length === 0) return 0
  return Math.min(0, ...validPoints.value.map(point => point.value as number))
})

const maxValue = computed(() => {
  if (validPoints.value.length === 0) return 0
  return Math.max(1, ...validPoints.value.map(point => point.value as number))
})

const yRange = computed(() => {
  const range = maxValue.value - minValue.value
  return range === 0 ? Math.max(maxValue.value, 1) : range
})

function getX(index: number): number {
  if (props.points.length <= 1) {
    return padding.left + innerWidth.value / 2
  }

  return padding.left + (index / (props.points.length - 1)) * innerWidth.value
}

function getY(value: number): number {
  if (validPoints.value.length === 0) {
    return padding.top + innerHeight / 2
  }

  const normalized = (value - minValue.value) / yRange.value
  return padding.top + innerHeight - normalized * innerHeight
}

const linePath = computed(() => {
  if (validPoints.value.length === 0) return ''

  return validPoints.value
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${getX(point.index)} ${getY(point.value as number)}`)
    .join(' ')
})

const areaPath = computed(() => {
  if (validPoints.value.length === 0) return ''

  const first = validPoints.value[0]
  const last = validPoints.value[validPoints.value.length - 1]
  const baselineY = padding.top + innerHeight

  return [
    `M ${getX(first!.index)} ${baselineY}`,
    ...validPoints.value.map(point => `L ${getX(point.index)} ${getY(point.value as number)}`),
    `L ${getX(last!.index)} ${baselineY}`,
    'Z'
  ].join(' ')
})

const axisLabels = computed(() => {
  if (props.points.length === 0) {
    return []
  }

  const lastIndex = props.points.length - 1
  const indices = lastIndex > 0 && innerWidth.value < 280
    ? [0, lastIndex]
    : props.points.length <= 3
      ? props.points.map((_, index) => index)
      : [0, Math.floor(lastIndex / 2), lastIndex]

  return indices.map(index => ({
    label: props.points[index]!.label,
    x: getX(index),
    anchor: lastIndex === 0 ? 'middle' : index === 0 ? 'start' : index === lastIndex ? 'end' : 'middle'
  }))
})

const formatter = computed(() =>
  props.valueFormatter ?? ((value: number) => `${Math.round(value * 10) / 10}h`)
)

const hoveredPoint = computed(() => {
  if (hoveredPointIndex.value === null) {
    return null
  }

  const point = props.points[hoveredPointIndex.value]
  if (!point || point.value === null || !Number.isFinite(point.value)) {
    return null
  }

  const pointX = getX(hoveredPointIndex.value)
  const tooltipWidth = Math.min(256, width.value - 24)
  const left = Math.max(12, Math.min(pointX - tooltipWidth / 2, width.value - tooltipWidth - 12))

  return {
    label: point.label,
    value: point.value,
    userLabels: point.userLabels ?? [],
    left: `${left}px`,
    width: `${tooltipWidth}px`,
    top: `${(getY(point.value) / height) * 100}%`,
    placeBelow: getY(point.value) <= padding.top + 28
  }
})

function formatUserLabelPreview(userLabels: string[]): string {
  if (userLabels.length === 0) {
    return 'No users in bucket'
  }

  if (userLabels.length <= 2) {
    return userLabels.join(', ')
  }

  return `${userLabels.slice(0, 2).join(', ')} +${userLabels.length - 2} more`
}
</script>

<template>
  <div
    ref="chartElement"
    class="relative w-full rounded-lg border border-black/8 bg-white/70 overflow-visible"
  >
    <div
      v-if="validPoints.length === 0"
      class="h-60 flex items-center justify-center text-sm text-zinc-500"
    >
      No data for the selected filters.
    </div>

    <template v-else>
      <div
        v-if="hoveredPoint"
        class="pointer-events-none absolute z-20 rounded-xl bg-zinc-950 px-3 py-3 text-white shadow-lg"
        :class="hoveredPoint.placeBelow ? 'translate-y-[14px]' : '-translate-y-[calc(100%+14px)]'"
        :style="{ left: hoveredPoint.left, top: hoveredPoint.top, width: hoveredPoint.width }"
      >
        <p class="text-[11px] uppercase tracking-[0.16em] text-white/60">
          {{ hoveredPoint.label }}
        </p>
        <p class="text-sm font-medium mt-1">
          {{ formatter(hoveredPoint.value) }}
        </p>
        <p class="text-xs text-white/72 mt-2">
          {{ hoveredPoint.userLabels.length === 1 ? 'User' : 'Users' }}:
          {{ formatUserLabelPreview(hoveredPoint.userLabels) }}
        </p>
      </div>

      <svg
        :viewBox="`0 0 ${width} ${height}`"
        class="block w-full"
        :style="{ height: `${height}px` }"
        role="img"
        aria-label="Metric trend chart"
      >

        <line
          :x1="padding.left"
          :x2="width - padding.right"
          :y1="padding.top + innerHeight"
          :y2="padding.top + innerHeight"
          stroke="var(--ui-border)"
        />

        <line
          :x1="padding.left"
          :x2="width - padding.right"
          :y1="padding.top"
          :y2="padding.top"
          stroke="var(--ui-border-muted)"
        />

        <path
          :d="areaPath"
          fill="rgba(20, 184, 166, 0.1)"
        />

        <path
          :d="linePath"
          fill="none"
          stroke="var(--ui-primary)"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <text
          :x="padding.left - 8"
          :y="padding.top - 2"
          fill="var(--ui-text-muted)"
          font-size="12"
          text-anchor="end"
        >
          {{ formatter(maxValue) }}
        </text>

        <text
          :x="padding.left - 8"
          :y="padding.top + innerHeight + 14"
          fill="var(--ui-text-muted)"
          font-size="12"
          text-anchor="end"
        >
          {{ formatter(minValue) }}
        </text>

        <g
          v-for="point in validPoints"
          :key="point.index"
        >
          <circle
            :cx="getX(point.index)"
            :cy="getY(point.value as number)"
            :r="Math.min(12, pointSpacing / 2)"
            fill="transparent"
            class="cursor-pointer"
            @mouseenter="hoveredPointIndex = point.index"
            @mouseleave="hoveredPointIndex = null"
          />

          <circle
            v-if="pointSpacing >= 12 || hoveredPointIndex === point.index"
            :cx="getX(point.index)"
            :cy="getY(point.value as number)"
            r="4"
            fill="var(--ui-primary)"
            stroke="white"
            stroke-width="2"
            class="pointer-events-none"
          />
        </g>

        <text
          v-for="axisLabel in axisLabels"
          :key="`${axisLabel.label}-${axisLabel.x}`"
          :x="axisLabel.x"
          :y="height - 10"
          fill="var(--ui-text-muted)"
          font-size="12"
          :text-anchor="axisLabel.anchor"
        >
          {{ axisLabel.label }}
        </text>
      </svg>
    </template>
  </div>
</template>
