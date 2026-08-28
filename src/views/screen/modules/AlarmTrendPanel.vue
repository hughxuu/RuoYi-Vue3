<script setup>
import { onMounted, ref, watch } from 'vue'
import ChartTypeToggle from '../components/ChartTypeToggle.vue'
import ScreenPanel from '../components/ScreenPanel.vue'
import { createDashboardTooltip, useECharts } from '../composables/useECharts'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  chartType: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['change-chart'])

const chartRef = ref(null)

const { setOption } = useECharts(chartRef)

const renderChart = () => {
  const lineChartData = [
    {
      name: '自接警数',
      type: 'line',
      smooth: true,
      data: props.data.self,
      lineStyle: { color: '#6b96e8', width: 2 }
    },
    {
      name: '转警数',
      type: 'line',
      smooth: true,
      data: props.data.transfer,
      lineStyle: { color: '#86c75b', width: 2 }
    },
    {
      name: '110派警数',
      type: 'line',
      smooth: true,
      data: props.data.dispatch,
      lineStyle: { color: '#f2b841', width: 2 }
    }
  ]

  const barChartData = [
    {
      name: '自接警数',
      type: 'bar',
      barWidth: 10,
      data: props.data.self,
      itemStyle: { color: '#6b96e8' }
    },
    {
      name: '转警数',
      type: 'bar',
      barWidth: 10,
      data: props.data.transfer,
      itemStyle: { color: '#86c75b' }
    },
    {
      name: '110派警数',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      data: props.data.dispatch,
      lineStyle: { width: 2, color: '#f2b841' },
      itemStyle: { color: '#ffe186' }
    }
  ]

  setOption({
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
    grid: {
      left: 48,
      right: 22,
      top: 46,
      bottom: 34,
      containLabel: true
    },
    xAxis: {
      data: props.data.xAxis,
      axisLine: {
        lineStyle: { color: '#38536a' }
      },
      axisLabel: {
        color: '#a8b4c1',
        interval: 4
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      min: 0,
      max: 1800,
      interval: 300,
      splitLine: {
        lineStyle: {
          color: 'rgba(72,108,132,.28)',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#a8b4c1'
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    series: props.chartType === 'line' ? lineChartData : barChartData
  })
}

watch(() => [props.data, props.chartType], renderChart, { deep: true })

onMounted(renderChart)
</script>

<template>
  <ScreenPanel title="接处警趋势变化" unit="(单位：起)">
    <template #actions>
      <ChartTypeToggle :model-value="chartType" @update:model-value="emit('change-chart', $event)" />
    </template>

    <div ref="chartRef" class="min-h-0 flex-1 w-full" />
  </ScreenPanel>
</template>
