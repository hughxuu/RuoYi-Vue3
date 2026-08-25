<script setup>
import { onMounted, ref, watch } from 'vue'
import ScreenPanel from '../components/ScreenPanel.vue'
import { useECharts } from '../composables/useECharts'
import { CHART_OPTIONS, PERIOD_OPTIONS } from '../constant'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  period: {
    type: String,
    required: true
  },
  chartType: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['change-period', 'change-chart'])

const chartRef = ref(null)

const { setOption } = useECharts(chartRef)

const renderChart = () => {
  const lineChatData = [
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

  const barChatData = [
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
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#0a2235',
      borderColor: '#1680ae',
      textStyle: { color: '#d8e6f0' }
    },
    grid: {
      left: 48,
      right: 22,
      top: 70,
      bottom: 42
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
    series: props.chartType === 'line' ? lineChatData : barChatData
  })
}

watch(() => [props.data, props.chartType], renderChart, { deep: true })

onMounted(renderChart)
</script>

<template>
  <ScreenPanel title="接处警趋势变化" unit="(单位：起)">
    <template #actions>
      <div class="screen-panel-action-stack">
        <el-segmented
          :model-value="period"
          :options="PERIOD_OPTIONS"
          aria-label="统计周期"
          class="screen-segmented screen-segmented-period w-40"
          size="default"
          @change="emit('change-period', $event)"
        />
        <el-segmented
          :model-value="chartType"
          :options="CHART_OPTIONS"
          aria-label="图表类型"
          class="screen-segmented screen-segmented-chart w-44"
          size="default"
          @change="emit('change-chart', $event)"
        />
      </div>
    </template>

    <div ref="chartRef" class="min-h-0 flex-1 w-full" />
  </ScreenPanel>
</template>
