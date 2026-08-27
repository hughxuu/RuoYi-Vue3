<script setup>
import { useFullscreen } from '@vueuse/core'
import { saveAs } from 'file-saver'
import { computed, onMounted, shallowRef } from 'vue'
import { getDashboardData } from './api/policeDashboard'
import ScreenHeader from './components/ScreenHeader.vue'

import ScreenToolbar from './components/ScreenToolbar.vue'
import { createEmptyDashboard, createInitialQuery } from './constant'
import AlarmKpiPanel from './modules/AlarmKpiPanel.vue'
import AlarmTrendPanel from './modules/AlarmTrendPanel.vue'
import FugitiveTrendPanel from './modules/FugitiveTrendPanel.vue'
import JuvenileTrendPanel from './modules/JuvenileTrendPanel.vue'
import MinorDistributionPanel from './modules/MinorDistributionPanel.vue'
import ResultPanel from './modules/ResultPanel.vue'
import UnitRankPanel from './modules/UnitRankPanel.vue'

const screenRef = shallowRef(null)
const { isFullscreen, toggle } = useFullscreen(screenRef, { autoExit: true })

const query = shallowRef(createInitialQuery())
const dashboard = shallowRef(createEmptyDashboard())
const loading = shallowRef(false)
const errorMessage = shallowRef('')
const alarmChartType = shallowRef('line')
const rankView = shallowRef('trend')
const juvenileChartType = shallowRef('line')

const specialPoliceUnitOptions = computed(() => dashboard.value.specialPoliceUnits)
const cityBranchUnitOptions = computed(() => dashboard.value.cityBranchUnits)

const loadData = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    dashboard.value = await getDashboardData(query.value)
  } catch (error) {
    errorMessage.value = '数据加载失败，请稍后重试'
    console.error('数据加载失败：', error)
  } finally {
    loading.value = false
  }
}

const updateQuery = (value) => {
  query.value = value
}

const updatePeriod = (period) => {
  query.value = { ...query.value, period }
  loadData()
}

const updateUnit = (unitName) => {
  query.value = { ...query.value, unitName }
  loadData()
}

const resetQuery = () => {
  query.value = createInitialQuery()
  loadData()
}

const escapeCsvValue = (value) => {
  const text = String(value ?? '')
  return text.includes(',') || text.includes('\n') ? `"${text.replaceAll('"', '""')}"` : text
}

const exportData = () => {
  const rows = [
    ['模块', '指标', '数值', '变化'],
    [
      '接处警数据',
      '总数',
      dashboard.value.alarmKpi.total.value,
      dashboard.value.alarmKpi.total.rate
    ],
    [
      '接处警数据',
      '自接警数据',
      dashboard.value.alarmKpi.selfAlarm.value,
      dashboard.value.alarmKpi.selfAlarm.rate
    ],
    [
      '接处警数据',
      '转警数据',
      dashboard.value.alarmKpi.transfer.value,
      dashboard.value.alarmKpi.transfer.rate
    ],
    [
      '接处警数据',
      '110派警',
      dashboard.value.alarmKpi.dispatch110.value,
      dashboard.value.alarmKpi.dispatch110.rate
    ],
    [
      '战果类数据',
      '抓获网逃数',
      dashboard.value.result.fugitive.value,
      dashboard.value.result.fugitive.rate
    ],
    [
      '战果类数据',
      '抓获团伙数',
      dashboard.value.result.gang.value,
      dashboard.value.result.gang.rate
    ],
    [
      '战果类数据',
      '抓获现行',
      dashboard.value.result.current.value,
      dashboard.value.result.current.rate
    ]
  ]
  const csv = `\ufeff${rows.map(row => row.map(escapeCsvValue).join(',')).join('\n')}`
  saveAs(new Blob([csv], { type: 'text/csv;charset=utf-8' }), '警务站大屏数据.csv')
}

onMounted(loadData)
</script>

<template>
  <div class="screen-page">
    <div
      ref="screenRef"
      class="flex h-screen w-full flex-col overflow-x-hidden overflow-y-auto bg-screen-page bg-screen-grid bg-screen-grid-size font-screen text-screen-text"
    >
      <ScreenHeader
        :update-time="dashboard.updateTime"
        :loading="loading"
        :fullscreen="isFullscreen"
        @fullscreen="toggle"
        @export="exportData"
      />

      <ScreenToolbar
        :model-value="query"
        :unit-options="specialPoliceUnitOptions"
        :loading="loading"
        @update:model-value="updateQuery"
        @submit="loadData"
        @reset="resetQuery"
      />

      <div
        v-if="errorMessage"
        class="flex items-center justify-center gap-3 rounded border border-screen-red/50 bg-red-950/40 p-2 text-xs text-red-200"
        role="alert"
      >
        {{ errorMessage }}
        <el-button text class="!m-0 !px-2 !text-red-100" size="small" @click="loadData">
          重新加载
        </el-button>
      </div>

      <main
        class="grid min-h-0 flex-1 grid-cols-1 gap-3 max-lg:grid-rows-screen-mobile lg:min-h-[84rem] lg:grid-cols-2 xl:min-h-0 xl:grid-cols-screen-desktop p-3 lg:p-4"
        :class="{ 'opacity-80': loading }"
      >
        <div
          class="grid min-h-0 grid-rows-screen-mobile-left gap-3 lg:row-span-2 lg:grid-rows-screen-left xl:row-span-1"
        >
          <AlarmKpiPanel :data="dashboard.alarmKpi" />
          <ResultPanel :data="dashboard.result" />
          <MinorDistributionPanel :data="dashboard.pie" />
        </div>

        <section class="grid min-h-0 grid-rows-screen-mobile-stack gap-3 lg:grid-rows-screen-stack">
          <FugitiveTrendPanel
            :data="dashboard.lineFugitive"
            :period="query.period"
            @change-period="updatePeriod"
          />
          <AlarmTrendPanel
            :data="dashboard.lineAlarm"
            :period="query.period"
            :chart-type="alarmChartType"
            @change-period="updatePeriod"
            @change-chart="alarmChartType = $event"
          />
        </section>

        <div class="grid min-h-0 grid-rows-screen-mobile-stack gap-3 lg:grid-rows-screen-stack">
          <UnitRankPanel
            :data="dashboard.rank"
            :period="query.period"
            :unit-options="cityBranchUnitOptions"
            :unit-name="query.unitName"
            :view="rankView"
            @update-unit="updateUnit"
            @change-period="updatePeriod"
            @change-view="rankView = $event"
          />

          <JuvenileTrendPanel
            :data="dashboard.juvenile"
            :period="query.period"
            :chart-type="juvenileChartType"
            :unit-options="cityBranchUnitOptions"
            :unit-name="query.unitName"
            @change-period="updatePeriod"
            @change-chart="juvenileChartType = $event"
            @update-unit="updateUnit"
          />
        </div>
      </main>
    </div>
  </div>
</template>
