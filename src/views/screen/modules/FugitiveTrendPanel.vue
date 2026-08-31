<script setup>
import { onMounted, ref, watch } from 'vue'
import ScreenPanel from '../components/ScreenPanel.vue'
import { createDashboardTooltip, useECharts } from '../composables/useECharts'

const props = defineProps({
  data: { type: Object, required: true }
})

const chartRef = ref(null)
const { setOption } = useECharts(chartRef)

// const renderChart = () => {
//   const colors = ['#6b96e8', '#86c75b', '#f2a62b']
//   const seriesList = props.data.seriesList || []
//   const xAxis = props.data.xAxis?.length
//     ? props.data.xAxis
//     : Array.from({ length: Math.max(...seriesList.map(item => item.data?.length || 0), 0) }, (_, index) => index + 1)
//   setOption({
//     backgroundColor: 'transparent',
//     legend: {
//       top: 8,
//       left: 'center',
//       itemWidth: 18,
//       itemHeight: 4,
//       itemGap: 18,
//       icon: 'roundRect',
//       textStyle: { color: '#a8b4c1', fontSize: 12 }
//     },
//     tooltip: createDashboardTooltip(),
//     grid: { left: 48, right: 22, top: 46, bottom: 60, containLabel: true },
//     xAxis: {
//       type: 'category', // ✅新增
//       data: xAxis,
//       axisLine: { lineStyle: { color: '#38536a' } },
//       axisLabel: { color: '#a8b4c1', interval: 4 },
//       axisTick: { show: false },
//       interval: 0, // ✅全部日期强制显示，不省略
//       rotate: 30, // ✅日期倾斜防止重叠
//       showMinLabel: true, // ✅新增
//       showMaxLabel: true  // ✅新增
//     },
//     yAxis: {
//       min: 0,
//       // 去掉固定max、interval，自动根据数据自适应
//       splitLine: {
//         lineStyle: { color: 'rgba(72,108,132,.28)', type: 'dashed' }
//       },
//       axisLabel: { color: '#a8b4c1' },
//       axisLine: { show: false },
//       axisTick: { show: false }
//     },
//     series: seriesList.map((item, index) => ({
//       name: item.name,
//       type: 'line',
//       smooth: true,
//       symbol: 'circle',
//       symbolSize: 7,
//       data: item.data || [],
//       lineStyle: { width: 2, color: colors[index] || colors[0] },
//       itemStyle: { color: colors[index] || colors[0] }
//     }))
//   })
// }

const renderChart = () => {
  const colors = ['#6b96e8', '#86c75b', '#f2a62b']
  const seriesList = props.data.seriesList || []
  const xAxis = props.data.xAxis?.length
      ? props.data.xAxis
      : Array.from({ length: Math.max(...seriesList.map(item => item.data?.length || 0), 0) }, (_, index) => index + 1)

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
    grid: {
      left: 48,
      right: 22,
      top: 46,
      bottom: 50,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xAxis,
      axisLine: { lineStyle: { color: '#38536a' } },
      axisLabel: {
        color: '#a8b4c1',
        interval: 0,
        rotate: 0,
        margin: 8,
        showMinLabel: true,
        showMaxLabel: true
      },
      axisTick: { show: false }
    },
    yAxis: {
      min: 0,
      splitLine: {
        lineStyle: { color: 'rgba(72,108,132,.28)', type: 'dashed' }
      },
      axisLabel: { color: '#a8b4c1' },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: seriesList.map((item, index) => ({
      name: item.name,
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 12,
      data: item.data || [],
      lineStyle: { width: 5, color: colors[index] || colors[0] },
      itemStyle: { color: colors[index] || colors[0] }
    }))
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
