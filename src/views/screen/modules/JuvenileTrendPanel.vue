<script setup>
import { onMounted, ref, watch } from 'vue'
import ChartTypeToggle from '../components/ChartTypeToggle.vue'
import ScreenPanel from '../components/ScreenPanel.vue'
import { createDashboardTooltip, useECharts } from '../composables/useECharts'

const props = defineProps({
  data: { type: Object, required: true },
  monthRange: { type: Array, default: null },
  chartType: { type: String, required: true },
  unitOptions: { type: Array, default: () => [] },
  deptId: { type: [String, Number], default: '全部单位' }
})

const emit = defineEmits(['change-month-range', 'change-chart', 'update-unit'])
const chartRef = ref(null)
const { setOption } = useECharts(chartRef)

const renderChart = () => {
  const dataList = props.data.data || []
  const colors = ['#6b96e8', '#86c75b']
  const lineChartData = [
    {
      name: '未成年犯罪案件数',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 5,
      data: dataList.map(item => item.minorCaseCount || 0),
      lineStyle: { width: 2, color: colors[0] },
      itemStyle: { color: colors[0] }
    },
    {
      name: '涉未成年人数',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 5,
      data: dataList.map(item => item.minorPerson || 0),
      lineStyle: { width: 2, color: colors[1] },
      itemStyle: { color: colors[1] }
    }
  ]

  const barChartData = [
    {
      name: '未成年犯罪案件数',
      type: 'bar',
      barWidth: 7,
      data: dataList.map(item => item.minorCaseCount || 0),
      itemStyle: { color: colors[0] }
    },
    {
      name: '涉未成年人数',
      type: 'bar',
      barWidth: 7,
      data: dataList.map(item => item.minorPerson || 0),
      itemStyle: { color: colors[1] }
    }
  ]

  setOption({
    legend: {
      top: 8,
      left: 12,
      itemWidth: 18,
      itemHeight: 4,
      itemGap: 18,
      icon: 'roundRect',
      textStyle: { color: '#a8b4c1', fontSize: 12 }
    },
    tooltip: createDashboardTooltip(),
    grid: { left: 42, right: 18, top: 46, bottom: 34, containLabel: true },
    xAxis: {
      data: dataList.map(item => item.statDate),
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
    series: props.chartType === 'line' ? lineChartData : barChartData
  })
}

watch(() => [props.data, props.chartType], renderChart, { deep: true })
onMounted(renderChart)
</script>

<template>
  <ScreenPanel title="未成年人数趋势" unit="(单位：人)">
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
        :model-value="deptId"
        clearable
        size="small"
        placeholder="全部单位"
        @update:model-value="emit('update-unit', $event)"
      >
        <el-option label="全部单位" value="全部单位" />
        <el-option v-for="unit in unitOptions" :key="unit.deptId" :label="unit.deptName" :value="unit.deptId" />
      </el-select>
    </div>

    <div ref="chartRef" class="min-h-0 flex-1 w-full" />
  </ScreenPanel>
</template>
