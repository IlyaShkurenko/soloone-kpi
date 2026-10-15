<script setup lang="ts">
const props = defineProps<{
  points: Array<{ label: string, value: number | null }>
  formatter?: (value: number) => string
}>()
const maximum = computed(() => Math.max(1, ...props.points.map(point => point.value ?? 0)))
</script>

<template>
  <div>
    <div
      class="flex items-end gap-2 h-20 mt-5"
      role="img"
      aria-label="Weekly trend"
    >
      <div
        v-for="(point, index) in points"
        :key="index"
        tabindex="0"
        class="group relative flex-1 min-w-0 rounded-[2px] bg-zinc-400/60 dark:bg-zinc-600 outline-offset-2"
        :class="{ '!bg-blue-500': index === points.length - 1 }"
        :style="{ height: `${point.value === null ? 0 : Math.max(point.value / maximum * 100, 2)}%` }"
        :aria-label="`${point.label}: ${point.value === null ? '—' : formatter ? formatter(point.value) : point.value}`"
      >
        <span class="hidden group-hover:block group-focus:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-20 w-max max-w-56 rounded-md bg-zinc-950 px-3 py-2 text-xs text-white shadow-lg">
          {{ point.label }}: {{ point.value === null ? '—' : formatter ? formatter(point.value) : point.value }}
        </span>
      </div>
    </div>
    <div class="flex justify-between text-xs text-zinc-500 mt-2 gap-2">
      <span>{{ points[0]?.label }}</span>
      <span
        v-if="points.length > 1"
        class="text-right"
      >{{ points[points.length - 1]?.label }}</span>
    </div>
  </div>
</template>
