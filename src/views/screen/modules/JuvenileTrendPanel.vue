<script setup>
import { onMounted, ref, watch } from 'vue'
import ScreenPanel from '../components/ScreenPanel.vue'
import StatItem from '../components/StatItem.vue'
import { useECharts } from '../composables/useECharts'
import { CHART_OPTIONS, PERIOD_OPTIONS } from '../constant'

const props = defineProps({
  data: { type: Object, required: true },
  period: { type: String, required: true },
  chartType: { type: String, required: true },
  unitOptions: { type: Array, default: () => [] },
  unitName: { type: String, default: '' }
})

const emit = defineEmits(['change-period', 'change-chart', 'update-unit'])
const chartRef = ref(null)
const { setOption } = useECharts(chartRef)

const renderChart = () => {
  setOption({
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
    grid: { left: 42, right: 18, top: 136, bottom: 38 },
    xAxis: {
      data: props.data.xAxis,
      axisLabel: { color: '#a8b4c1', interval: 3 },
      axisLine: { lineStyle: { color: '#38536a' } },
      axisTick: { show: false }
    },
    yAxis: {
      min: 0,
      max: 300,
      interval: 50,
      splitLine: {
        lineStyle: { color: 'rgba(72,108,132,.28)', type: 'dashed' }
      },
      axisLabel: { color: '#a8b4c1' },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: '自接警数',
        type: props.chartType,
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        barWidth: 7,
        data: props.data.self,
        lineStyle: { width: 2, color: '#6b96e8' },
        itemStyle: { color: '#6b96e8' }
      },
      {
        name: '转警数',
        type: props.chartType,
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        barWidth: 7,
        data: props.data.transfer,
        lineStyle: { width: 2, color: '#86c75b' },
        itemStyle: { color: '#86c75b' }
      },
      {
        name: '110派警数',
        type: props.chartType,
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        barWidth: 7,
        data: props.data.dispatch,
        lineStyle: { width: 2, color: '#f2b841' },
        itemStyle: { color: '#f2b841' }
      }
    ]
  })
}

watch(() => [props.data, props.chartType], renderChart, { deep: true })
onMounted(renderChart)
</script>

<template>
  <ScreenPanel title="未成年人数趋势" unit="(单位：人)">
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
            :model-value="chartType"
            :options="CHART_OPTIONS"
            aria-label="图表类型"
            class="screen-segmented screen-segmented-chart min-w-0"
            size="large"
            @change="emit('change-chart', $event)"
          />
        </div>
      </div>
    </template>
    <div ref="chartRef" class="min-h-0 flex-1 w-full" />
    <div class="screen-stat-grid">
      <StatItem label="本月累计" :value="data.stats.monthTotal" />
      <StatItem label="较上月" :value="data.stats.lastMonth" tone="green" />
      <StatItem label="同比去年" :value="data.stats.yoy" tone="green" />
      <StatItem label="环比上周" :value="data.stats.wow" tone="red" />
    </div>
  </ScreenPanel>
</template>
