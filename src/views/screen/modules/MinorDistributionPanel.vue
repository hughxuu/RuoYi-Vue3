<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import ScreenPanel from '../components/ScreenPanel.vue'
import TrendValue from '../components/TrendValue.vue'
import { useECharts } from '../composables/useECharts'
import { MINOR_LEVELS } from '../constant'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const chartRef = ref(null)
const { setOption } = useECharts(chartRef)

const total = computed(() =>
  MINOR_LEVELS.reduce((sum, item) => sum + (props.data[item.key] || 0), 0)
)

const percentage = value => (total.value ? `${((value / total.value) * 100).toFixed(1)}%` : '0%')

const renderChart = () => {
  setOption({
    color: ['#ef6b62', '#f3a51c', '#f5c35d', '#526fa9', '#37424c'],
    legend: {
      orient: 'vertical',
      right: 8,
      top: 'middle',
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 8,
      textStyle: { color: '#cbd7df', fontSize: 12 },
      formatter: (name) => {
        const level = MINOR_LEVELS.find(item => item.label === name)
        const value = level ? props.data[level.key] || 0 : 0
        return `${name}  ${value} (${percentage(value)})`
      }
    },
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'pie',
        radius: ['48%', '77%'],
        center: ['30%', '50%'],
        startAngle: 90,
        label: {
          show: true,
          color: '#dce7ef',
          formatter: '{c}\n{d}%',
          fontSize: 12
        },
        labelLine: {
          length: 8,
          length2: 10,
          lineStyle: { color: '#607080' }
        },
        data: MINOR_LEVELS.map(item => ({
          value: props.data[item.key],
          name: item.label
        }))
      }
    ],
    graphic: [
      {
        type: 'text',
        left: '30%',
        top: '42%',
        style: {
          text: total.value,
          fill: '#dfe9f0',
          font: '700 28px Microsoft YaHei',
          textAlign: 'center'
        }
      },
      {
        type: 'text',
        left: '30%',
        top: '58%',
        style: {
          text: '总人数',
          fill: '#a8b4c1',
          font: '14px Microsoft YaHei',
          textAlign: 'center'
        }
      }
    ]
  })
}

watch(() => props.data, renderChart, { deep: true })
onMounted(renderChart)
</script>

<template>
  <ScreenPanel title="罪错未成年 (红橙黄蓝黑) 分布">
    <div ref="chartRef" class="h-full min-h-0 flex-1" />
    <div
      class="flex h-9 shrink-0 items-center justify-center gap-2 border-t border-screen-border-soft/60 text-sm text-screen-muted"
    >
      <span>较昨日</span>
      <TrendValue :value="data.dayChange" class="font-bold text-2xl text-screen-lime" />
    </div>
  </ScreenPanel>
</template>
