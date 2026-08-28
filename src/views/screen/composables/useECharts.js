import { useResizeObserver } from '@vueuse/core'
import * as echarts from 'echarts'
import { onBeforeUnmount, onMounted, shallowRef } from 'vue'

const dashboardChartAnimation = {
  animation: true,
  animationDuration: 900,
  animationDurationUpdate: 650,
  animationEasing: 'cubicOut',
  animationEasingUpdate: 'cubicInOut'
}

export const createDashboardTooltip = (trigger = 'axis') => ({
  trigger,
  backgroundColor: 'rgba(3, 18, 38, 0.96)',
  borderColor: '#1478ba',
  borderWidth: 1,
  padding: [8, 12],
  textStyle: {
    color: '#d8e9f6',
    fontSize: 12
  },
  axisPointer: trigger === 'axis'
    ? {
        type: 'line',
        lineStyle: { color: 'rgba(32, 181, 241, 0.6)', width: 1 }
      }
    : undefined,
  extraCssText: 'box-shadow: 0 0 12px rgba(0, 100, 190, 0.28);'
})

export function useECharts(elementRef) {
  const chart = shallowRef(null)

  const ensureChart = () => {
    if (!elementRef.value) {
      return null
    }

    chart.value ||= echarts.init(elementRef.value)
    return chart.value
  }

  const setOption = (option) => {
    ensureChart()?.setOption({ ...dashboardChartAnimation, ...option }, true)
  }

  const resize = () => {
    ensureChart()?.resize()
  }

  useResizeObserver(elementRef, resize)

  onMounted(resize)
  onBeforeUnmount(() => ensureChart()?.dispose())

  return {
    setOption,
    resize
  }
}
