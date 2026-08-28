<script setup>
import { onMounted, ref, watch } from 'vue'
import ChartTypeToggle from '../components/ChartTypeToggle.vue'
import ScreenPanel from '../components/ScreenPanel.vue'
import StatItem from '../components/StatItem.vue'
import { createDashboardTooltip, useECharts } from '../composables/useECharts'

const props = defineProps({
  data: { type: Object, required: true },
  monthRange: { type: Array, default: null },
  unitOptions: { type: Array, default: () => [] },
  unitName: { type: String, default: '' },
  chartType: { type: String, required: true }
})

const emit = defineEmits(['update-unit', 'change-month-range', 'change-chart'])
const chartRef = ref(null)
const { setOption } = useECharts(chartRef)

const renderChart = () => {
  const lineChartData = [
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

  const barChartData = [
    {
      type: 'bar',
      data: props.data.values,
      barWidth: 12,
      label: { show: true, position: 'right', color: '#cbd7df' },
      itemStyle: { color: '#4f75b8' }
    }
  ]

  setOption({
    legend: props.chartType === 'line'
      ? {
          top: 8,
          left: 12,
          itemWidth: 18,
          itemHeight: 4,
          itemGap: 18,
          icon: 'roundRect',
          textStyle: { color: '#a8b4c1', fontSize: 12 }
        }
      : undefined,
    tooltip: props.chartType === 'line'
      ? createDashboardTooltip()
      : createDashboardTooltip('item'),
    grid: props.chartType === 'line'
      ? { left: 42, right: 18, top: 46, bottom: 32, containLabel: true }
      : { left: 70, right: 32, top: 20, bottom: 24, containLabel: true },
    xAxis: props.chartType === 'line'
      ? {
          data: props.data.trend?.xAxis || [],
          axisLabel: { color: '#a8b4c1' },
          axisLine: { lineStyle: { color: '#38536a' } }
        }
      : {
          type: 'value',
          min: 0,
          max: 150,
          interval: 30,
          splitLine: { lineStyle: { color: 'rgba(72,108,132,.25)' } },
          axisLabel: { color: '#a8b4c1' },
          axisLine: { show: false }
        },
    yAxis: props.chartType === 'line'
      ? {
          splitLine: { lineStyle: { color: 'rgba(72,108,132,.25)' } },
          axisLabel: { color: '#a8b4c1' }
        }
      : {
          type: 'category',
          inverse: true,
          data: props.data.units,
          axisLabel: { color: '#c1ccd6' },
          axisLine: { show: false },
          axisTick: { show: false }
        },
    series: props.chartType === 'line' ? lineChartData : barChartData
  })
}

watch(() => [props.data, props.chartType], renderChart, { deep: true })
onMounted(renderChart)
</script>

<template>
  <ScreenPanel title="抢盗窃数据趋势" unit="(单位：起)">
    <template #actions>
      <ChartTypeToggle :model-value="chartType" @update:model-value="emit('change-chart', $event)" />
    </template>

    <div class="flex min-w-0 items-center justify-end gap-2 px-4">
      <el-date-picker
        :model-value="monthRange"
        type="monthrange"
        format="YYYY-MM"
        value-format="YYYY-MM"
        range-separator="~"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
        clearable
        size="small"
        popper-class="dashboard-popper"
        class="dashboard-date-picker min-w-0 flex-1"
        @update:model-value="emit('change-month-range', $event)"
      />
      <el-select
        popper-class="dashboard-popper"
        class="dashboard-select min-w-0 flex-1"
        :model-value="unitName"
        clearable
        size="small"
        placeholder="全部单位"
        @update:model-value="emit('update-unit', $event)"
      >
        <el-option label="全部单位" value="" />
        <el-option v-for="{ deptId, deptName } in unitOptions" :key="deptId" :label="deptName" :value="deptId" />
      </el-select>
    </div>

    <div ref="chartRef" class="min-h-0 flex-1 w-full" />

    <div class="grid shrink-0 grid-cols-4 gap-1 px-3 pb-2">
      <StatItem label="本月累计" :value="data.stats?.monthTotal" />
      <StatItem label="较上月" :value="data.stats?.lastMonth" tone="red" />
      <StatItem label="同比去年" :value="data.stats?.yoy" tone="green" />
      <StatItem label="环比上周" :value="data.stats?.wow" tone="red" />
    </div>
  </ScreenPanel>
</template>
