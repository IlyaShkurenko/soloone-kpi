<script setup lang="ts">
const dailyDisconnects = [
  { date: '9 Oct', disconnects: 2 },
  { date: '10 Oct', disconnects: 9 },
  { date: '11 Oct', disconnects: 3 },
  { date: '12 Oct', disconnects: 0 },
  { date: '13 Oct', disconnects: 1 },
  { date: '14 Oct', disconnects: 1 },
  { date: '15 Oct · partial', disconnects: 2 }
]
const totalDisconnects = dailyDisconnects.reduce((sum, day) => sum + day.disconnects, 0)
const additionalBatch = { numbers: 6, disconnects: 4 }
const connectionStatus = [
  { label: 'Connected to WhatsApp · AUTH', warming: 8 + additionalBatch.numbers, nonWarming: 7 },
  { label: 'Not connected · LAUNCH', warming: 12, nonWarming: 3 },
  { label: 'Health unavailable', warming: 6, nonWarming: 0 }
]
const pipeline = [
  { label: 'Awaiting connection', count: 5 },
  { label: 'Assigned to warm-up', count: connectionStatus.reduce((sum, row) => sum + row.warming, 0) },
  { label: 'Outside warm-up · ready + active', count: connectionStatus.reduce((sum, row) => sum + row.nonWarming, 0) }
]
const totalNumbers = pipeline.reduce((sum, stage) => sum + stage.count, 0)
const largestStage = Math.max(...pipeline.map(stage => stage.count))
</script>

<template>
  <section
    class="space-y-5 min-w-0"
    aria-label="WhatsApp and number statistics"
  >
    <div>
      <h2 class="text-lg font-semibold">
        WhatsApp &amp; numbers · 9–15 Oct 2026
      </h2>
      <p class="text-sm text-zinc-500 mt-1">
        Reported snapshot for all numbers · Original report: 15 Oct, 13:13 London, with the additional batch update below.
      </p>
      <p class="text-sm text-zinc-500 mt-1">
        These supplied figures cover this period only; dashboard date and user filters do not apply.
      </p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <article class="kpi-panel p-5">
        <h3 class="font-medium">
          WhatsApp Blocks
        </h3>
        <p class="text-3xl font-semibold text-teal-700 tabular-nums mt-4">
          —
        </p>
        <p class="text-sm text-zinc-500 mt-2">
          No confirmed count for this period.
        </p>
      </article>
      <article class="kpi-panel p-5">
        <h3 class="font-medium">
          Block Rate
        </h3>
        <p class="text-3xl font-semibold text-teal-700 tabular-nums mt-4">
          —
        </p>
        <p class="text-sm text-zinc-500 mt-2">
          Unavailable without confirmed block data.
        </p>
      </article>
      <article class="kpi-panel p-5">
        <h3 class="font-medium">
          Non-warming Numbers Disconnected
        </h3>
        <p class="text-3xl font-semibold text-teal-700 tabular-nums mt-4">
          4
        </p>
        <p class="text-sm text-zinc-500 mt-2">
          Among the current 10 numbers outside warm-up.
        </p>
      </article>
      <article class="kpi-panel p-5">
        <h3 class="font-medium">
          Non-warming Disconnection Rate
        </h3>
        <p class="text-3xl font-semibold text-teal-700 tabular-nums mt-4">
          40%
        </p>
        <p class="text-sm text-zinc-500 mt-2">
          4 of 10 numbers lost authorization.
        </p>
      </article>
    </div>

    <article class="kpi-panel p-5 space-y-5">
      <div>
        <h3 class="font-medium">
          Number pipeline
        </h3>
        <p class="text-sm text-zinc-500 mt-2">
          {{ totalNumbers }} numbers in total
        </p>
      </div>
      <div
        v-for="stage in pipeline"
        :key="stage.label"
        class="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)_40px] sm:items-center"
      >
        <div class="flex justify-between gap-3 text-sm">
          <span>{{ stage.label }}</span>
          <span class="sm:hidden tabular-nums">{{ stage.count }}</span>
        </div>
        <div class="h-5 rounded-md bg-teal-600/10 overflow-hidden">
          <div
            class="h-full rounded-md bg-teal-600 dark:bg-teal-400"
            :style="{ width: `${stage.count / largestStage * 100}%` }"
          />
        </div>
        <span class="hidden sm:block text-right text-sm tabular-nums">{{ stage.count }}</span>
      </div>
      <p class="text-sm text-zinc-500">
        Warm-up assignment includes disconnected channels and those with unavailable health.
        Ready and active numbers are reported together because a separate breakdown is unavailable.
      </p>
    </article>

    <article class="kpi-panel p-5">
      <h3 class="font-medium">
        WhatsApp connection status
      </h3>
      <p class="text-sm text-zinc-500 mt-2">
        Includes the {{ additionalBatch.numbers }} additional connected numbers assigned to warm-up.
        This batch has {{ additionalBatch.disconnects }} reported disconnections during the period.
      </p>
      <div class="overflow-x-auto mt-4">
        <table class="w-full text-sm whitespace-nowrap">
          <thead class="text-xs text-zinc-500">
            <tr>
              <th class="text-left py-2 font-normal">
                Connection state
              </th>
              <th class="text-right px-3 font-normal">
                Assigned to warm-up
              </th>
              <th class="text-right pl-3 font-normal">
                Outside warm-up
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in connectionStatus"
              :key="row.label"
              class="border-t border-black/10"
            >
              <td class="py-3">
                {{ row.label }}
              </td>
              <td class="text-right px-3 tabular-nums">
                {{ row.warming }}
              </td>
              <td class="text-right pl-3 tabular-nums">
                {{ row.nonWarming }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-sm text-zinc-500 mt-3">
        Health unavailable: port8, port15, port20, port23, port24 and port25.
      </p>
    </article>

    <article class="kpi-panel p-5">
      <h3 class="font-medium">
        Authorization losses · all numbers
      </h3>
      <p class="text-3xl font-semibold text-teal-700 tabular-nums mt-4">
        {{ totalDisconnects + additionalBatch.disconnects }}
      </p>
      <p class="text-sm text-zinc-500 mt-2">
        {{ totalDisconnects }} events affecting 17 numbers in the original report, plus {{ additionalBatch.disconnects }} events in the additional batch.
        A number can disconnect more than once. Short starting/creating restarts are excluded.
      </p>
      <p class="text-sm text-zinc-500 mt-2">
        Outside warm-up: port5, port10, port13 and port14. Port10 had reconnected by the original report.
      </p>
      <div class="overflow-x-auto mt-5">
        <table class="w-full text-sm whitespace-nowrap">
          <caption class="text-left text-zinc-500 pb-3 whitespace-normal">
            Daily breakdown through 15 Oct, 13:13 London. The {{ additionalBatch.disconnects }} additional disconnections have no daily breakdown and are not included in this table.
          </caption>
          <thead class="text-xs text-zinc-500">
            <tr>
              <th class="text-left py-2 font-normal">
                Date
              </th>
              <th class="text-right pl-3 font-normal">
                Authorization losses
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="day in dailyDisconnects"
              :key="day.date"
              class="border-t border-black/10"
            >
              <td class="py-3">
                {{ day.date }}
              </td>
              <td class="text-right pl-3 tabular-nums">
                {{ day.disconnects }}
              </td>
            </tr>
          </tbody>
          <tfoot class="border-t border-black/10 font-medium">
            <tr>
              <td class="pt-3">
                Original report total
              </td>
              <td class="text-right pt-3 pl-3 tabular-nums">
                {{ totalDisconnects }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </article>
  </section>
</template>
