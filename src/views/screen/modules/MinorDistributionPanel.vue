<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import AnimatedStatistic from '../components/AnimatedStatistic.vue'
import ScreenPanel from '../components/ScreenPanel.vue'
import TrendValue from '../components/TrendValue.vue'
import { createDashboardTooltip, useECharts } from '../composables/useECharts'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const chartRef = ref(null)
const { setOption } = useECharts(chartRef)

const pieData = computed(() => props.data.dataList || [])
const total = computed(() => props.data.total ?? pieData.value.reduce((sum, item) => sum + (item.value || 0), 0))

const hasData = computed(() => total.value > 0)

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
      itemGap: 10,
      textStyle: { color: '#cbd7df', fontSize: 12 },
      formatter: (name) => {
        const item = pieData.value.find(({ name: itemName }) => itemName === name)
        const value = item?.value || 0
        return `${name}  ${value} (${item?.percent || percentage(value)})`
      }
    },
    tooltip: createDashboardTooltip('item'),
    series: [
      {
        type: 'pie',
        radius: ['44%', '70%'],
        center: ['30%', '48%'],
        startAngle: 90,
        avoidLabelOverlap: true,
        label: {
          show: hasData.value,
          color: '#dce7ef',
          formatter: ({ value, percent }) => (value ? `${value}\n${percent}%` : ''),
          fontSize: 12
        },
        labelLine: {
          show: hasData.value,
          length: 8,
          length2: 10,
          lineStyle: { color: '#607080' }
        },
        itemStyle: { borderColor: '#041a31', borderWidth: 2 },
        data: pieData.value
      }
    ]
  })
}

watch(() => props.data, renderChart, { deep: true })
onMounted(renderChart)
</script>

<template>
  <ScreenPanel title="罪错未成年 (红橙黄蓝黑) 分布">
    <div class="relative flex-1">
      <div ref="chartRef" class="size-full" />
      <div class="pointer-events-none absolute left-[30%] top-[48%] z-10 -translate-x-1/2 -translate-y-1/2 text-center">
        <AnimatedStatistic :value="total" class="font-bold" :value-style="{ color: '#dfe9f0', fontSize: '1.75rem', lineHeight: '1' }" />
        <span class="block text-xs text-muted">总人数</span>
      </div>
    </div>

    <div class="flex h-9 shrink-0 items-center justify-center gap-2 border-t border-line-muted/60 bg-black/10 text-sm text-muted">
      <span>较昨日</span>
      <TrendValue :value="data.ratioCompareYesterday" class="font-bold text-2xl text-success" />
    </div>
  </ScreenPanel>
</template>
