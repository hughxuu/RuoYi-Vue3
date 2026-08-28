<script setup>
import { onMounted, ref, watch } from 'vue'
import ScreenPanel from '../components/ScreenPanel.vue'
import { createDashboardTooltip, useECharts } from '../composables/useECharts'

const props = defineProps({
  data: { type: Object, required: true }
})

const chartRef = ref(null)
const { setOption } = useECharts(chartRef)

const renderChart = () => {
  setOption({
    backgroundColor: 'transparent',
    legend: {
      top: 8,
      left: 'center',
      itemWidth: 18,
      itemHeight: 4,
      itemGap: 18,
      icon: 'roundRect',
      textStyle: { color: '#a8b4c1', fontSize: 12 }
    },
    tooltip: createDashboardTooltip(),
    grid: { left: 48, right: 22, top: 46, bottom: 34, containLabel: true },
    xAxis: {
      data: props.data.xAxis,
      axisLine: { lineStyle: { color: '#38536a' } },
      axisLabel: { color: '#a8b4c1', interval: 4 },
      axisTick: { show: false }
    },
    yAxis: {
      min: 0,
      max: 1500,
      interval: 300,
      splitLine: {
        lineStyle: { color: 'rgba(72,108,132,.28)', type: 'dashed' }
      },
      axisLabel: { color: '#a8b4c1' },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: '抓获网逃数',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        data: props.data.caught,
        lineStyle: { width: 2, color: '#6b96e8' },
        itemStyle: { color: '#8ab4ff' }
      },
      {
        name: '在逃网逃数',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        data: props.data.atLarge,
        lineStyle: { width: 2, color: '#86c75b' },
        itemStyle: { color: '#b5df80' }
      },
      {
        name: '新增网逃数',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        data: props.data.newlyAdded,
        lineStyle: { width: 2, color: '#f2a62b' },
        itemStyle: { color: '#ffb146' }
      }
    ]
  })
}

watch(() => props.data, renderChart, { deep: true })
onMounted(renderChart)
</script>

<template>
  <ScreenPanel title="网逃数据趋势变化" unit="(单位：人)">
    <div ref="chartRef" class="min-h-0 flex-1 w-full" />
  </ScreenPanel>
</template>
