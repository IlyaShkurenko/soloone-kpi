<script setup lang="ts">
const props = defineProps<{
  points: Array<{ label: string, value: number | null }>
  valueFormatter?: (value: number) => string
}>()

const width = 760
const height = 240
const padding = { top: 18, right: 16, bottom: 36, left: 16 }
const innerWidth = width - padding.left - padding.right
const innerHeight = height - padding.top - padding.bottom

const validPoints = computed(() =>
  props.points
    .map((point, index) => ({ ...point, index }))
    .filter(point => typeof point.value === 'number' && Number.isFinite(point.value))
)

const minValue = computed(() => {
  if (validPoints.value.length === 0) return 0
  return Math.min(...validPoints.value.map(point => point.value as number))
})

const maxValue = computed(() => {
  if (validPoints.value.length === 0) return 0
  return Math.max(...validPoints.value.map(point => point.value as number))
})

const yRange = computed(() => {
  const range = maxValue.value - minValue.value
  return range === 0 ? Math.max(maxValue.value, 1) : range
})

function getX(index: number): number {
  if (props.points.length <= 1) {
    return padding.left + innerWidth / 2
  }

  return padding.left + (index / (props.points.length - 1)) * innerWidth
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
    ...validPoints.value.map((point) => `L ${getX(point.index)} ${getY(point.value as number)}`),
    `L ${getX(last!.index)} ${baselineY}`,
    'Z'
  ].join(' ')
})

const axisLabels = computed(() => {
  if (props.points.length === 0) {
    return []
  }

  if (props.points.length <= 3) {
    return props.points.map((point, index) => ({ label: point.label, x: getX(index) }))
  }

  const middleIndex = Math.floor((props.points.length - 1) / 2)

  return [
    { label: props.points[0]!.label, x: getX(0) },
    { label: props.points[middleIndex]!.label, x: getX(middleIndex) },
    { label: props.points[props.points.length - 1]!.label, x: getX(props.points.length - 1) }
  ]
})

const formatter = computed(() =>
  props.valueFormatter ?? ((value: number) => `${Math.round(value * 10) / 10}h`)
)
</script>

<template>
  <div class="w-full rounded-2xl border border-black/8 bg-white/70 overflow-hidden">
    <div
      v-if="validPoints.length === 0"
      class="h-60 flex items-center justify-center text-sm text-zinc-500"
    >
      No data for the selected filters.
    </div>

    <svg
      v-else
      :viewBox="`0 0 ${width} ${height}`"
      class="w-full h-60"
      preserveAspectRatio="none"
      role="img"
      aria-label="Metric trend chart"
    >
      <defs>
        <linearGradient id="kpi-line-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(15, 118, 110, 0.36)" />
          <stop offset="100%" stop-color="rgba(15, 118, 110, 0.03)" />
        </linearGradient>
      </defs>

      <line
        :x1="padding.left"
        :x2="width - padding.right"
        :y1="padding.top + innerHeight"
        :y2="padding.top + innerHeight"
        stroke="rgba(24, 24, 27, 0.12)"
      />

      <line
        :x1="padding.left"
        :x2="width - padding.right"
        :y1="padding.top"
        :y2="padding.top"
        stroke="rgba(24, 24, 27, 0.06)"
      />

      <path
        :d="areaPath"
        fill="url(#kpi-line-fill)"
      />

      <path
        :d="linePath"
        fill="none"
        stroke="#0f766e"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <circle
        v-for="point in validPoints"
        :key="point.index"
        :cx="getX(point.index)"
        :cy="getY(point.value as number)"
        r="4"
        fill="#0f766e"
        stroke="white"
        stroke-width="2"
      />

      <text
        :x="padding.left"
        :y="padding.top - 2"
        fill="rgba(24, 24, 27, 0.58)"
        font-size="12"
      >
        {{ formatter(maxValue) }}
      </text>

      <text
        :x="padding.left"
        :y="padding.top + innerHeight + 14"
        fill="rgba(24, 24, 27, 0.58)"
        font-size="12"
      >
        {{ formatter(minValue) }}
      </text>

      <text
        v-for="axisLabel in axisLabels"
        :key="`${axisLabel.label}-${axisLabel.x}`"
        :x="axisLabel.x"
        :y="height - 10"
        fill="rgba(24, 24, 27, 0.58)"
        font-size="12"
        text-anchor="middle"
      >
        {{ axisLabel.label }}
      </text>
    </svg>
  </div>
</template>
