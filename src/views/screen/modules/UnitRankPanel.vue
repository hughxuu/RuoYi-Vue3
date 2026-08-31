<script setup>
import { onMounted, ref, watch } from 'vue'
import ChartTypeToggle from '../components/ChartTypeToggle.vue'
import ScreenPanel from '../components/ScreenPanel.vue'
import { createDashboardTooltip, useECharts } from '../composables/useECharts'

const props = defineProps({
  data: { type: Object, required: true },
  monthRange: { type: Array, default: null },
  unitOptions: { type: Array, default: () => [] },
  deptId: { type: [String, Number], default: null },
  chartType: { type: String, required: true }
})

const emit = defineEmits(['update-unit', 'change-month-range', 'change-chart'])
const chartRef = ref(null)
const { setOption } = useECharts(chartRef)

/**
 * 按月分组求和
 * @param {Array} list 后端原始data数组
 * @returns {{xAxis: string[], yAxis: number[]}}
 */
function groupByMonth(list) {
  const map = {}
  list.forEach(item => {
    const date = item.statDate
    const val = Number(item.monthTotal) || 0
    if (!map[date]) map[date] = 0
    map[date] += val
  })
  const sortedKeys = Object.keys(map).sort()
  return {
    xAxis: sortedKeys,
    yAxis: sortedKeys.map(k => map[k])
  }
}

const renderChart = () => {
  // const rawList = props.data || []
  // const { xAxis, yAxis } = groupByMonth(rawList)

  const raw = props.data || {}
  let xAxis, yAxis, seriesName = '两抢一盗案件数'

  if (raw && raw.seriesList && Array.isArray(raw.seriesList) && raw.xAxis) {
    const first = raw.seriesList[0] || { data: [], name: '两抢一盗案件数' }
    xAxis = raw.xAxis.slice()
    yAxis = first.data ? first.data.slice() : []
    while (yAxis.length < xAxis.length) yAxis.push(0)
    seriesName = first.name || '两抢一盗案件数'
  } else {
    const list = Array.isArray(raw) ? raw : []
    const result = groupByMonth(list)
    xAxis = result.xAxis
    yAxis = result.yAxis
  }

  // console.log('原始数据rawList', rawList)
  // console.log('聚合后 xAxis', xAxis, 'yAxis', yAxis)

  // 空数据保护，防止Math.max空数组报错空白
  if (!xAxis.length) {
    setOption({
      xAxis: { type: 'category', data: [] },
      yAxis: { type: 'value' },
      series: [],
      // ===== 新增：显示“暂无数据” =====
      graphic: {
        type: 'text',
        left: 'center',
        top: 'middle',
        style: {
          text: '暂无数据',
          fill: '#a8b4c1',
          fontSize: 16,
          fontWeight: 'normal'
        },
        z: 100
      }
    })
    return
  }

  const colors = ['#6b96e8', '#86c75b']

  const lineChartData = [
    {
      name: '两抢一盗案件数',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 12,
      data: yAxis,
      lineStyle: { width: 5, color: colors[0] },
      itemStyle: { color: colors[0] }
    }
  ]

  const barChartData = [
    {
      name: '两抢一盗案件数',
      type: 'bar',
      data: yAxis,
      barWidth: 12,
      label: { show: true, position: 'right', color: '#cbd7df' },
      itemStyle: { color: colors[0] }
    }
  ]

  const maxVal = Math.max(...yAxis)
  const barMax = maxVal + 20

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
          data: xAxis,
          axisLabel: { color: '#a8b4c1' },
          axisLine: { lineStyle: { color: '#38536a' } }
        }
        : {
          type: 'value',
          min: 0,
          max: barMax,
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
          data: xAxis,
          axisLabel: { color: '#c1ccd6' },
          axisLine: { show: false },
          axisTick: { show: false }
        },
    series: props.chartType === 'line' ? lineChartData : barChartData
  })
}

// watch(() => [props.data, props.chartType], renderChart, { deep: true })
watch(
    () => [props.data?.data, props.chartType],
    () => renderChart(),
    { deep: true }
)

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
          :model-value="deptId"
          clearable
          size="small"
          placeholder="全部单位"
          @update:model-value="emit('update-unit', $event)"
      >
        <el-option label="全部单位" :value="null"/>
        <el-option v-for="unit in unitOptions" :key="unit.deptId" :label="unit.deptName" :value="unit.deptId" />
      </el-select>
    </div>

    <div ref="chartRef" class="min-h-0 flex-1 w-full"></div>
  </ScreenPanel>
</template>
