<script setup>
import { onMounted, ref, watch } from 'vue'
import ScreenPanel from '../components/ScreenPanel.vue'
import StatItem from '../components/StatItem.vue'
import { useECharts } from '../composables/useECharts'
import { CHART_OPTIONS, PERIOD_OPTIONS } from '../constant'

const props = defineProps({
  data: { type: Object, required: true },
  period: { type: String, required: true },
  unitOptions: { type: Array, default: () => [] },
  unitName: { type: String, default: '' },
  view: { type: String, required: true }
})

const emit = defineEmits(['update-unit', 'change-period', 'change-view'])
const chartRef = ref(null)
const { setOption } = useECharts(chartRef)

const renderChart = () => {
  const isTrend = props.view === 'trend'
  const option = isTrend
    ? {
        legend: {
          top: 96,
          left: 12,
          itemWidth: 18,
          itemHeight: 4,
          itemGap: 18,
          icon: 'roundRect',
          textStyle: { color: '#a8b4c1', fontSize: 12 }
        },
        tooltip: { trigger: 'axis' },
        grid: { left: 42, right: 18, top: isTrend ? 136 : 128, bottom: 28 },
        xAxis: {
          data: props.data.trend?.xAxis || [],
          axisLabel: { color: '#a8b4c1' },
          axisLine: { lineStyle: { color: '#38536a' } }
        },
        yAxis: {
          splitLine: { lineStyle: { color: 'rgba(72,108,132,.25)' } },
          axisLabel: { color: '#a8b4c1' }
        },
        series: [
          {
            name: '抢劫',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            data: props.data.trend?.robbery || props.data.trend?.values || [],
            lineStyle: { width: 2, color: '#6b96e8' },
            itemStyle: { color: '#6b96e8' }
          },
          {
            name: '盗窃',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            data: props.data.trend?.theft || [],
            lineStyle: { width: 2, color: '#86c75b' },
            itemStyle: { color: '#86c75b' }
          },
          {
            name: '扒窃',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            data: props.data.trend?.pickpocket || [],
            lineStyle: { width: 2, color: '#f2b841' },
            itemStyle: { color: '#f2b841' }
          }
        ]
      }
    : {
        grid: { left: 70, right: 45, top: 128, bottom: 20 },
        xAxis: {
          type: 'value',
          min: 0,
          max: 150,
          interval: 30,
          splitLine: { lineStyle: { color: 'rgba(72,108,132,.25)' } },
          axisLabel: { color: '#a8b4c1' },
          axisLine: { show: false }
        },
        yAxis: {
          type: 'category',
          inverse: true,
          data: props.data.units,
          axisLabel: { color: '#c1ccd6' },
          axisLine: { show: false },
          axisTick: { show: false }
        },
        series: [
          {
            type: 'bar',
            data: props.data.values,
            barWidth: 12,
            label: { show: true, position: 'right', color: '#cbd7df' },
            itemStyle: { color: '#4f75b8' }
          }
        ]
      }
  setOption(option)
}

watch(() => [props.data, props.view], renderChart, { deep: true })
onMounted(renderChart)
</script>

<template>
  <ScreenPanel title="抢盗窃数据趋势" unit="(单位：起)">
    <template #actions>
      <div class="screen-panel-action-stack w-80">
        <el-select
          popper-class="screen-popper"
          class="screen-unit-select w-full [&_.el-select\_\_wrapper]:!bg-screen-input [&_.el-select\_\_wrapper]:!shadow-none [&_.el-select\_\_wrapper]:!ring-1 [&_.el-select\_\_wrapper]:!ring-screen-border-soft [&_.el-select\_\_selected-item]:!text-screen-text [&_.el-select\_\_caret]:!text-screen-muted"
          :model-value="unitName"
          size="large"
          placeholder="全部单位"
          @update:model-value="emit('update-unit', $event)"
        >
          <el-option label="全部单位" value="" />
          <el-option
            v-for="unit in unitOptions"
            :key="unit.value"
            :label="unit.label"
            :value="unit.value"
          />
        </el-select>
        <div class="grid grid-cols-2 gap-2">
          <el-segmented
            :model-value="period"
            :options="PERIOD_OPTIONS"
            aria-label="统计周期"
            class="screen-segmented screen-segmented-period min-w-0"
            size="large"
            @change="emit('change-period', $event)"
          />
          <el-segmented
            :model-value="view"
            :options="CHART_OPTIONS"
            aria-label="图表类型"
            class="screen-segmented screen-segmented-chart min-w-0"
            size="large"
            @change="emit('change-view', $event)"
          />
        </div>
      </div>
    </template>
    <div ref="chartRef" class="min-h-0 flex-1 w-full" />
    <div class="screen-stat-grid">
      <StatItem label="本月累计" :value="data.stats.monthTotal" />
      <StatItem label="较上月" :value="data.stats.lastMonth" tone="red" />
      <StatItem label="同比去年" :value="data.stats.yoy" tone="green" />
      <StatItem label="环比上周" :value="data.stats.wow" tone="red" />
    </div>
  </ScreenPanel>
</template>
